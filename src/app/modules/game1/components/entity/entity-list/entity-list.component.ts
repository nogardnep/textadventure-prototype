import { Place } from './../../../../../../game/modules/base/models/entities/material/Place';
import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';
import { Entity } from 'src/game/core/models/Entity';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
})
export class EntityListComponent implements OnInit {
  @Input() entity: Entity;

  constructor() {}

  ngOnInit() {}

  isVisible(entity: MaterialEntity): boolean {
    return (this.entity.getPlay().getPlayer() as Character).canSee(entity);
  }

  getLabel(): string {
    let label: string;

    if (this.entity instanceof Character) {
      label = 'porte';
    } else if (this.entity instanceof Place) {
      label = 'il y a là';
    }

    return label;
  }

  getEntities(): MaterialEntity[] {
    let found: MaterialEntity[] = [];

    if (this.entity instanceof MaterialEntity) {
      (this.entity as MaterialEntity).getChildren().forEach((item) => {
        if (!item.isThePlayer()) {
          found.push(item);
        }
      });
    }

    return found;
  }
}
