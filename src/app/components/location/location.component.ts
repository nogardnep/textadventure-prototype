import { Component, Input, OnInit } from '@angular/core';
import { MaterialEntity } from 'src/game/models/entities/MaterialEntity';
import { Entity } from 'src/game/models/Entity';
import {
  Connection,
  Place,
} from '../../../game/models/entities/material/Place';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  // @Input() entityId: EntityId;
  // entity: Entity;
  @Input() entity: MaterialEntity;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  ngOnChanges() {
    // this.entity = GameController.getEntity(this.entityId);
  }
  getExits(): Connection[] {
    return (this.entity as Place).connections;
  }

  onClickExit(exit: Connection): void {
    (this.entity as Place).exitToConnection(exit);
    this.gameService.emitPlay();
  }
}
