import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Entity } from 'src/game/core/models/Entity';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
})
export class EntityComponent implements OnInit {
  @Input() entity: Entity;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  onClickEntity(): void {
    this.gameService.setSelection(this.entity);
  }
}
