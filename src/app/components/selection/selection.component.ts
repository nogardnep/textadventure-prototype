import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Entity } from 'src/game/core/models/Entity';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
})
export class SelectionComponent implements OnInit {
  @Input() entity: Entity;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  onClickUnselect(): void {
    this.gameService.setSelection(null);
  }
}
