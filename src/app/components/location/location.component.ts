import { GameController } from '../../../game/GameController';
import { Connection, Place } from '../../../game/models/entities/Place';
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
  getExits(): Connection[] {
    return (this.entity as Place).connections;
  }

  onClickExit(exit: Connection): void {
    (this.entity as Place).exit(exit);
    this.gameService.emitPlay();
  }
}
