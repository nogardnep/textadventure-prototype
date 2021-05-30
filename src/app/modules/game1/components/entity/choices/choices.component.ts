import { Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import {
  ButtonType,
  InterfaceService,
} from 'src/app/services/interface.service';
import { Choice } from 'src/game/core/models/Choice';
import { Entity } from 'src/game/core/models/Entity';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrls: ['./choices.component.scss'],
})
export class ChoicesComponent implements OnInit {
  @Input() entity: Entity;
  choices: Choice[];
  updateSubscription: Subscription;

  constructor(
    private gameService: GameService,
    private interfaceService: InterfaceService
  ) {}

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

  onClickChoice(choice: Choice): void {
    this.interfaceService.onClickButton(ButtonType.Simple);
    this.entity.getPlay().useChoice(choice);
  }

  private update(): void {
    this.choices = [];
    this.entity.getChoices().forEach((item) => {
      if (!item.check || item.check()) {
        this.choices.push(item);
      }
    });
  }
}
