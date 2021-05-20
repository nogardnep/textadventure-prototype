import { Component, Input, OnChanges } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Paragraph } from 'src/game/core/models/Paragraph';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent {
  @Input() entity: MaterialEntity;

  constructor() {}
}
