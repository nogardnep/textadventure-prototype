import { Component, Input, OnInit } from '@angular/core';
import { GameController } from 'src/game/core/GameController';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
})
export class EntityListComponent implements OnInit {
  @Input() parent: MaterialEntity;

  constructor() {}

  ngOnInit() {}

  isVisible(entity: MaterialEntity): boolean {
    return (GameController.getPlay().getPlayer() as Character).canSee(entity);
  }

  isThePlayer(entity: MaterialEntity): boolean {
    return entity.equals(GameController.getPlay().getPlayer());
  }
}
