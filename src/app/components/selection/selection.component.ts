import { GameController } from '../../../game/GameController';
import { GameService } from '../../services/game.service';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { EntityId, Entity } from 'src/game/models/Entity';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
})
export class SelectionComponent implements OnInit, OnChanges {
  @Input() entity: Entity;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  ngOnChanges() {
    // if (this.entityId) {
    //   this.entity = GameController.getPlay().getEntity(this.entityId);
    // } else {
    //   this.entity = null;
    // }
  }

  onClickUnselect(): void {
    this.gameService.setSelection(null);
  }
}
