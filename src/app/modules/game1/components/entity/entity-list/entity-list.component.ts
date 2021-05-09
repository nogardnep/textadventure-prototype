import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';
import { Entity } from 'src/game/core/models/Entity';
import { TextWrapper } from 'src/game/core/models/Text';

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

  isThePlayer(entity: MaterialEntity): boolean {
    return entity.equals(this.entity.getPlay().getPlayer());
  }

  getChildren(): MaterialEntity[] {
    if (this.entity instanceof MaterialEntity) {
      return this.entity.getChildren();
    } else {
      return [];
    }
  }

  getLabel(): TextWrapper {
    let label: TextWrapper;

    if (this.entity instanceof Character) {
      label = { fr: 'porte' };
    } else {
      label = { fr: 'contient' };
    }

    return label;
  }
}
