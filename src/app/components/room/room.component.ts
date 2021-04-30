import { GameController } from './../../../game/GameController';
import { Exit, Room } from './../../../game/models/entity/Room';
import { GameService } from './../../services/game.service';
import { Component, OnInit, Input } from '@angular/core';
import { EntityId, Entity } from 'src/game/models/Entity';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  @Input() entityId: EntityId;
  entity: Entity;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.entity = GameController.getEntity(this.entityId);
  }

  test(): void {
    // console.log('!');
    // console.log(this.entity);
  }

  isThePlayer(entityId: EntityId): boolean {
    return GameController.getPlay().playerId === entityId;
  }

  getExits(): Exit[] {
    return (this.entity as Room).exits;
  }

  onClickExit(exit: Exit): void {
    (this.entity as Room).exit(exit);
    this.gameService.emitPlay();
  }
}
