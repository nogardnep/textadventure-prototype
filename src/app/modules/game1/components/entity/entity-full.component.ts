import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Paragraph } from 'src/game/core/models/Paragraph';
import { BaseEntity } from 'src/game/modules/base/models/entities/BaseEntity';

@Component({
  selector: 'app-entity-full',
  templateUrl: './entity-full.component.html',
  styleUrls: ['./entity-full.component.scss'],
})
export class EntityFullComponent implements OnInit {
  @Input() entity: BaseEntity;
  @Input() description: Paragraph[];

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  onClickEntity(): void {
    this.gameService.setSelection(this.entity);
  }
}
