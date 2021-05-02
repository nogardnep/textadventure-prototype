import { GameController } from 'src/game/GameController';
import { Entity } from 'src/game/models/Entity';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
})
export class EntityListComponent implements OnInit {
  @Input() parent: Entity;

  constructor() {}

  ngOnInit() {}

  isVisible(entity: Entity): boolean {
    return GameController.getPlay().getPlayer().canSee(entity);
  }

  isThePlayer(entity: Entity): boolean {
    return entity.equals(GameController.getPlay().getPlayer());
  }
}
