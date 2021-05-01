import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Entity, EntityId } from 'src/game/models/Entity';
import { WearableObject } from 'src/game/models/entity/WearableObject';
import { GameController } from './../../../../game/GameController';
import { emplacementNames } from '../../../../game/enums/Emplacement';
import { NameWrapper } from './../../../../game/models/Text';
import { GameService } from './../../../services/game.service';

@Component({
  selector: 'app-entity-preview',
  templateUrl: './entity-preview.component.html',
  styleUrls: ['./entity-preview.component.scss'],
})
export class EntityPreviewComponent implements OnInit, OnChanges {
  @Input() entityId: EntityId;
  entity: Entity;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.entity = GameController.getEntity(this.entityId);
  }

  onClickEntity(): void {
    this.gameService.setSelection(this.entity);
  }

  isSelected(): boolean {
    return (
      this.gameService.getSelection() &&
      this.gameService.getSelection().getId() === this.entityId
    );
  }

  isWorn(): boolean {
    return (GameController.getEntity(this.entityId) as WearableObject).worn;
  }

  getEmplacement(): NameWrapper {
    return emplacementNames[(this.entity as WearableObject).getEmplacement()];
  }
}
