import { GameService } from 'src/app/services/game.service';
import { Subscription } from 'rxjs';
import { InterfaceService } from 'src/app/services/interface.service';
import { Entity } from 'src/game/core/models/Entity';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BaseEntity } from 'src/game/modules/base/models/BaseEntity';
import { Place } from 'src/game/modules/base/models/entities/material/Place';
import { Paragraph } from 'src/game/core/models/Paragraph';

@Component({
  selector: 'app-entity-full',
  templateUrl: './entity-full.component.html',
  styleUrls: ['./entity-full.component.scss'],
})
export class EntityFullComponent {
  @Input() entity: BaseEntity;
  hasConnections: boolean;
  entityAsPlace: Place;
  name: string;
  description: Paragraph[];
  updateSubcription: Subscription;

  constructor(
    private gameService: GameService,
    private interfaceService: InterfaceService
  ) {}

  ngOnInit() {
    this.updateSubcription = this.gameService.updateEvent.subscribe(() => {
      this.update();
    });
  }

  ngOnChanges() {
    this.update();
  }

  ngOnDestroy() {
    this.updateSubcription.unsubscribe();
  }

  onItemClicked(item: Entity) {
    this.interfaceService.setSelection(item);
  }

  private update(): void {
    this.name = this.entity.getName().printWithIndefiniteArticle();
    this.hasConnections =
      this.entity instanceof Place && this.entity.getConnections().length > 0;
    this.entityAsPlace = this.entity as Place;
    this.description = this.entity.getFullDescription();
  }
}
