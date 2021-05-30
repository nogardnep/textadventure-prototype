import { Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { InterfaceService } from 'src/app/services/interface.service';
import { Paragraph } from 'src/game/core/models/Paragraph';
import { BaseEntity } from 'src/game/modules/base/models/BaseEntity';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
})
export class SelectionComponent implements OnInit {
  @Input() entity: BaseEntity;
  visible: boolean;
  private updateSubscription: Subscription;

  constructor(
    private gameService: GameService,
    private interfaceService: InterfaceService
  ) {}

  ngOnInit() {
    this.updateSubscription = this.gameService.updateEvent.subscribe(() => {
      this.update();
    });
  }

  ngOnChanges() {
    this.update();
  }

  onClickUnselect(): void {
    this.interfaceService.setSelection(null);
  }

  private update(): void {
    this.visible = false;

    if (this.entity instanceof MaterialEntity) {
      const player = this.entity.getPlay().getPlayer() as Character;
      this.visible = player.canSee(this.entity);
    } else {
      this.visible = true;
    }
  }
}
