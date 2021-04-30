import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Entity } from 'src/game/models/Entity';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent implements OnInit, OnChanges {
  // @Input() playerId: EntityId;

  @Input() player: Entity;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  ngOnChanges() {
    // console.log(this.playerId)

    // if (this.playerId) {
    //   this.player = GameController.getEntity(this.playerId);
    // } else {
    //   this.player = null;
    // }
  }
}
