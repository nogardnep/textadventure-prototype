import { Character } from 'src/game/models/entities/Character';
import { UsableObject } from 'src/game/models/entities/UsableObject';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Entity, EntityId } from 'src/game/models/Entity';
import { GameController } from './../../../../game/GameController';
import { EMPLACEMENT_NAMES } from '../../../../game/enums/Emplacement';
import { NameWrapper } from './../../../../game/models/Text';
import { GameService } from './../../../services/game.service';

@Component({
  selector: 'app-entity-preview',
  templateUrl: './entity-preview.component.html',
  styleUrls: ['./entity-preview.component.scss'],
})
export class EntityPreviewComponent implements OnInit, OnChanges {
  // @Input() entityId: EntityId;
  @Input() entity: Entity;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  ngOnChanges() {
    // this.entity = GameController.getPlay().getEntity(this.entityId);
  }

  onClickEntity(): void {
    this.gameService.setSelection(this.entity);
  }

  isSelected(): boolean {
    return (
      this.gameService.getSelection() &&
      this.gameService.getSelection().equals(this.entity)
    );
  }

  isWorn(): boolean {
    return (this.entity as UsableObject).worn;
  }

  isOpen(): boolean {
    return (
      (this.entity as UsableObject).openable &&
      !(this.entity as UsableObject).closed
    );
  }

  isClosed(): boolean {
    return (
      (this.entity as UsableObject).openable &&
      (this.entity as UsableObject).closed
    );
  }

  isDead(): boolean {
    return (this.entity as Character).dead;
  }

  contentIsVisible(): boolean {
    return (
      !(this.entity as UsableObject).closed ||
      (this.entity as UsableObject).transparent
    );
  }

  getEmplacement(): NameWrapper {
    return EMPLACEMENT_NAMES[(this.entity as UsableObject).getEmplacement()];
  }
}
