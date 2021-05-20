import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Name } from 'src/game/core/models/Name';
import { EMPLACEMENT_NAMES } from 'src/game/modules/base/dictionnaries/emplacement';
import { BaseEntity } from 'src/game/modules/base/models/entities/BaseEntity';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { Thing } from 'src/game/modules/base/models/entities/material/Thing';
import { WearableObject } from 'src/game/modules/base/models/entities/material/thing/object/WearableObject';

@Component({
  selector: 'app-entity-preview',
  templateUrl: './entity-preview.component.html',
  styleUrls: ['./entity-preview.component.scss'],
})
export class EntityPreviewComponent implements OnInit {
  @Input() entity: BaseEntity;

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
    return (this.entity as WearableObject).worn;
  }

  isOpen(): boolean {
    return (this.entity as Thing).openable && !(this.entity as Thing).closed;
  }

  isClosed(): boolean {
    return (this.entity as Thing).openable && (this.entity as Thing).closed;
  }

  isDead(): boolean {
    return (this.entity as Character).dead;
  }

  contentIsVisible(): boolean {
    return !(this.entity as Thing).closed || (this.entity as Thing).transparent;
  }

  getEmplacementName(): Name {
    return EMPLACEMENT_NAMES[(this.entity as WearableObject).getEmplacement()];
  }
}
