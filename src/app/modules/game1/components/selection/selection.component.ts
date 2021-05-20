import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Paragraph } from 'src/game/core/models/Paragraph';
import { BaseEntity } from 'src/game/modules/base/models/entities/BaseEntity';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
})
export class SelectionComponent implements OnInit {
  @Input() entity: BaseEntity;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  onClickUnselect(): void {
    this.gameService.setSelection(null);
  }

  isVisible(): boolean {
    let visible = false;

    if (this.entity instanceof MaterialEntity) {
      const player = this.entity.getPlay().getPlayer() as Character;
      visible = player.canSee(this.entity);
    } else {
      visible = true;
    }

    return visible;
  }
}
