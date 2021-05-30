import { GameService } from 'src/app/services/game.service';
import { Subscription } from 'rxjs';
import { BASE_CARACTERISTIC_NAMES } from 'src/game/modules/base/dictionnaries/caracteristics';
import { Component, Input, OnInit } from '@angular/core';
import {
  BaseEntity,
  CaracterticModifier,
} from 'src/game/modules/base/models/BaseEntity';
import { Caracteristic } from 'src/game/modules/base/models/Caracteristic';

type ModifierWrapper = {
  modifier: CaracterticModifier;
  effective: boolean;
  text: string;
}

@Component({
  selector: 'app-caracteristic-modifiers',
  templateUrl: './caracteristic-modifiers.component.html',
  styleUrls: ['./caracteristic-modifiers.component.scss'],
})
export class CaracteristicModifiersComponent {
  @Input() entity: BaseEntity;
  items: ModifierWrapper[];
  private updateSubscription: Subscription;

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

  private update(): void {
    this.items = [];

    for (let key in this.entity.getModifiers()) {
      const modifier = this.entity.getModifiers()[key];

      this.items.push({
        modifier,
        effective: !modifier.check || modifier.check(),
        text: BASE_CARACTERISTIC_NAMES[key].printSimple()
      })
    }
  }
}
