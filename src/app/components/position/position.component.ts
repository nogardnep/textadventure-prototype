import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Entity } from 'src/game/core/models/Entity';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent implements OnInit {
  // @Input() playerId: EntityId;

  @Input() player: Entity;

  constructor(private gameService: GameService) {}

  ngOnInit() {}
}
