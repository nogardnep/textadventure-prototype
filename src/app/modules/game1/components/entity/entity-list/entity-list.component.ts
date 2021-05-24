import { Place } from 'src/game/modules/base/models/entities/material/Place';
import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';
import { Entity } from 'src/game/core/models/Entity';
import { Thing } from 'src/game/modules/base/models/entities/material/Thing';

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
      label = 'portant';
    } else if (this.entity instanceof Place) {
      label = 'il y a là';
    } else if (this.entity instanceof Thing) {
      label = 'surportant';
    }

    return label;
  }

  getEntities(): MaterialEntity[] {
    let found: MaterialEntity[] = [];

    if (this.entity instanceof MaterialEntity) {
      this.entity.getChildren().forEach((item) => {
        const player = this.entity.getPlay().getPlayer() as Character;
        if (!item.isThePlayer() && player.canSee(item)) {
          found.push(item);
        }
      });
    }

    return found;
  }
}
