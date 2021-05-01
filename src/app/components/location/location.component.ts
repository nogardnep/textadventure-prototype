import { GameController } from '../../../game/GameController';
import { Exit, Room } from '../../../game/models/entity/Room';
import { GameService } from '../../services/game.service';
import { Component, OnInit, Input } from '@angular/core';
import { EntityId, Entity } from 'src/game/models/Entity';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  // @Input() entityId: EntityId;
  // entity: Entity;
  @Input() entity: Entity;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  ngOnChanges() {
    // this.entity = GameController.getEntity(this.entityId);
  }

  isThePlayer(entity: Entity): boolean {
    return entity.isSameAs(GameController.getPlay().getPlayer());
  }

  getExits(): Exit[] {
    return (this.entity as Room).exits;
  }

  onClickExit(exit: Exit): void {
    (this.entity as Room).exit(exit);
    this.gameService.emitPlay();
  }
}
