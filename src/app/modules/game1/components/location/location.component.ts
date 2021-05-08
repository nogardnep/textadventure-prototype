import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import {
  Connection,
  Place,
} from 'src/game/modules/base/models/entities/material/Place';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';

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
