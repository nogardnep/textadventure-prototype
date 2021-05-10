import { Component, Input } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent {
  @Input() entity: MaterialEntity;

  constructor(private gameService: GameService) {}
}
