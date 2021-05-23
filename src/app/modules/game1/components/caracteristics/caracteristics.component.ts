import { Component, Input, OnInit } from '@angular/core';
import { BASE_CARACTERISTIC_NAMES } from 'src/game/modules/base/dictionnaries/caracteristics';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';

@Component({
  selector: 'app-caracteristics',
  templateUrl: './caracteristics.component.html',
  styleUrls: ['./caracteristics.component.scss'],
})
export class CaracteristicsComponent implements OnInit {
  @Input() entity: MaterialEntity;
  caracteristicNames = BASE_CARACTERISTIC_NAMES;

  constructor() {}

  ngOnInit() {}
}
