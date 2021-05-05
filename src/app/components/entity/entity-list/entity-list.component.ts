import { GameController } from 'src/game/GameController';
import { Entity } from 'src/game/models/Entity';
import { Component, Input, OnInit } from '@angular/core';
import { MaterialEntity } from 'src/game/models/entities/MaterialEntity';

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
    return GameController.getPlay().getPlayer().canSee(entity);
  }

  isThePlayer(entity: MaterialEntity): boolean {
    return entity.equals(GameController.getPlay().getPlayer());
  }
}
