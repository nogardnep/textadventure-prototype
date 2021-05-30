import { GameService } from 'src/app/services/game.service';
import { Subscription } from 'rxjs';
import { Place } from 'src/game/modules/base/models/entities/material/Place';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';
import { Entity } from 'src/game/core/models/Entity';
import { Thing } from 'src/game/modules/base/models/entities/material/Thing';
import { Container } from 'src/game/modules/base/models/entities/material/thing/object/Container';
import { BaseEntity } from 'src/game/modules/base/models/BaseEntity';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
})
export class EntityListComponent implements OnInit {
  @Input() entity: BaseEntity;
  private updateSubscription: Subscription;
  label: string;
  entities: BaseEntity[];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.updateSubscription = this.gameService.updateEvent.subscribe(() => {
      this.update();
    });
  }

  ngOnChanges() {
    this.update();
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  private getLabel(): string {
    let label: string;

    if (this.entity instanceof Character) {
      label = 'ayant';
    } else if (this.entity instanceof Place) {
      label = 'il y a là';
    } else if (this.entity instanceof Thing) {
      if (this.entity instanceof Container) {
        label = 'contenant';
      } else {
        label = 'surportant';
      }
    }

    return label;
  }

  private getEntities(): BaseEntity[] {
    let found: BaseEntity[] = [];

    if (this.entity instanceof MaterialEntity) {
      this.entity.getChildren().forEach((item) => {
        const player = this.entity.getPlay().getPlayer();
        if (!item.isThePlayer() && player.canSee(item)) {
          found.push(item);
        }
      });
    }

    return found;
  }

  private update() {
    this.entities = [];
    this.label = this.getLabel();
    this.entities = this.getEntities();
  }
}
