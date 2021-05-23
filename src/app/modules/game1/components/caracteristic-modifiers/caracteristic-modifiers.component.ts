import { BASE_CARACTERISTIC_NAMES } from 'src/game/modules/base/dictionnaries/caracteristics';
import { Component, Input, OnInit } from '@angular/core';
import {
  BaseEntity,
  CaracterticModifier,
} from 'src/game/modules/base/models/entities/BaseEntity';

@Component({
  selector: 'app-caracteristic-modifiers',
  templateUrl: './caracteristic-modifiers.component.html',
  styleUrls: ['./caracteristic-modifiers.component.scss'],
})
export class CaracteristicModifiersComponent implements OnInit {
  @Input() entity: BaseEntity;
  caracteristicNames = BASE_CARACTERISTIC_NAMES;

  constructor() {}

  ngOnInit() {}

  isEffective(modifier: CaracterticModifier): boolean {
    return !modifier.check || modifier.check();
  }
}
