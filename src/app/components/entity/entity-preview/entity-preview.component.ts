import { Character } from 'src/game/models/entities/Character';
import { Thing } from 'src/game/models/entities/Thing';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Entity, EntityId } from 'src/game/models/Entity';
import { GameController } from './../../../../game/GameController';
import { EMPLACEMENT_NAMES } from '../../../../game/dictionnaries/Emplacement';
import { NameWrapper } from './../../../../game/models/Text';
import { GameService } from './../../../services/game.service';

@Component({
  selector: 'app-entity-preview',
  templateUrl: './entity-preview.component.html',
  styleUrls: ['./entity-preview.component.scss'],
})
export class EntityPreviewComponent implements OnInit {
  @Input() entity: Entity;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

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
    return (this.entity as Thing).worn;
  }

  isOpen(): boolean {
    return (
      (this.entity as Thing).openable &&
      !(this.entity as Thing).closed
    );
  }

  isClosed(): boolean {
    return (
      (this.entity as Thing).openable &&
      (this.entity as Thing).closed
    );
  }

  isDead(): boolean {
    return (this.entity as Character).dead;
  }

  contentIsVisible(): boolean {
    return (
      !(this.entity as Thing).closed ||
      (this.entity as Thing).transparent
    );
  }

  getEmplacement(): NameWrapper {
    return EMPLACEMENT_NAMES[(this.entity as Thing).getEmplacement()];
  }
}
