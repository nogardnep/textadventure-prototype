import { Component, Input } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { BaseEntity } from 'src/game/modules/base/models/entities/BaseEntity';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent {
  @Input() entity: BaseEntity;

  constructor(private gameService: GameService) {}
}
