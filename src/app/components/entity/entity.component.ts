import { GameController } from './../../../game/GameController';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Entity, EntityId } from 'src/game/models/Entity';
import { GameService } from './../../services/game.service';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
})
export class EntityComponent implements OnInit, OnChanges {
  @Input() entityId: EntityId;
  entity: Entity;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.entity = GameController.getEntity(this.entityId);
  }

  onClickEntity(): void {
    this.gameService.setSelection(this.entity);
  }
}
