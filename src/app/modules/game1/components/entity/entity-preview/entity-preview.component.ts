import { Component, Input, OnInit } from '@angular/core';
import {
  ButtonType,
  InterfaceService,
} from 'src/app/services/interface.service';
import { Entity } from 'src/game/core/models/Entity';
import { Name } from 'src/game/core/models/Name';
import { EMPLACEMENT_NAMES } from 'src/game/modules/base/dictionnaries/emplacement';
import { BaseEntity } from 'src/game/modules/base/models/BaseEntity';
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

  constructor(private interfaceService: InterfaceService) {}

  ngOnInit() {}

  onClickEntity(): void {
    this.interfaceService.onClickButton(ButtonType.Simple);
    this.interfaceService.setSelection(this.entity);
  }

  isSelected(): boolean {
    return (
      this.interfaceService.getSelection() &&
      this.interfaceService.getSelection().equals(this.entity)
    );
  }

  isWorn(): boolean {
    return this.entity instanceof WearableObject && this.entity.isWorn();
  }

  isOpen(): boolean {
    return (
      this.entity instanceof Thing &&
      this.entity.isOpenable() &&
      !this.entity.isClosed()
    );
  }

  isClosed(): boolean {
    return (
      this.entity instanceof Thing &&
      this.entity.isOpenable() &&
      this.entity.isClosed()
    );
  }

  isDead(): boolean {
    return this.entity instanceof Character && this.entity.isDead();
  }

  contentIsVisible(): boolean {
    return (
      this.entity instanceof Thing &&
      (!this.entity.isClosed() || this.entity.isTransparent())
    );
  }

  getEmplacementName(): Name {
    return EMPLACEMENT_NAMES[(this.entity as WearableObject).getEmplacement()];
  }

  onItemClicked(item: Entity) {
    this.interfaceService.setSelection(item);
  }
}
