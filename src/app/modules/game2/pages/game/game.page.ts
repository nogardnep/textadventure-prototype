import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameService, MessageWrapper } from 'src/app/services/game.service';
import { Entity } from 'src/game/core/models/Entity';
import { Narration } from 'src/game/core/models/Narration';
import { Play } from 'src/game/core/models/Play';
import { BaseEntity } from 'src/game/modules/base/models/entities/BaseEntity';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, OnDestroy {
  play: Play;
  messages: MessageWrapper[];
  private playSubscription: Subscription;
  private messagesSubscription: Subscription;
  stream: BaseEntity[] = [];

  constructor(private gameService: GameService, private router: Router) {
    // GameController.startNewPlay(this.gameService.getCurrentScenario())
    // GameController.getPlay().getScenario().start()
  }

  ngOnInit(): void {
    this.playSubscription = this.gameService.playSubject.subscribe(
      (play: Play) => {
        if (play) {
          this.play = play;
          this.stream.push((play.getPlayer() as Character).getParent());
        } else {
          this.play = null;
        }
      }
    );

    this.gameService.emitPlay();

    this.messagesSubscription = this.gameService.messagesSubject.subscribe(
      (message: MessageWrapper[]) => {
        this.messages = message;
      }
    );

    this.gameService.emitMessages();
  }

  ngOnDestroy(): void {
    this.messagesSubscription.unsubscribe();
    this.playSubscription.unsubscribe();
  }

  getPlayer(): Character {
    return this.play.getPlayer() as Character;
  }

  getNarration(): Narration {
    return this.play.getNarration();
  }

  getLocation(): Entity {
    return (this.play.getPlayer() as Character).getParent();
  }

  getFirstUnreadMessage(): MessageWrapper {
    let found: MessageWrapper = null;

    this.messages.forEach((item) => {
      if (!found && !item.read) {
        found = item;
      }
    });

    return found;
  }
}
