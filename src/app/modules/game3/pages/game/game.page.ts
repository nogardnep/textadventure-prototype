import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  GameService,
  MessageWrapper,
  StreamItem,
} from 'src/app/services/game.service';
import { Play } from 'src/game/core/models/Play';
import { Character } from 'src/game/modules/base/models/entities/material/Character';

@Component({
  selector: 'app-game-page',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, OnDestroy {
  @ViewChild('streamElement')
  streamElement: ElementRef;
  @ViewChildren('itemElement') itemElement: QueryList<any>;
  private playSubscription: Subscription;
  private messagesSubscription: Subscription;
  private streamSubscription: Subscription;
  play: Play;
  messages: MessageWrapper[];
  streamItems: StreamItem[] = [];
  player: Character;

  constructor(private gameService: GameService) {
    gameService.checkPlay();
  }

  ngOnInit(): void {
    this.playSubscription = this.gameService.playSubject.subscribe(
      (play: Play) => {
        if (play) {
          this.play = play;
          this.player = this.play.getPlayer() as Character;
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

    this.streamSubscription = this.gameService.streamSubject.subscribe(
      (stream) => {
        this.streamItems = stream;
      }
    );

    this.gameService.emitMessages();
  }

  ngOnDestroy(): void {
    this.messagesSubscription.unsubscribe();
    this.playSubscription.unsubscribe();
    this.streamSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.itemElement.changes.subscribe((list) => this.scroll(list));
  }

  private scroll(list: QueryList<any>): void {
    const streamHTML = this.streamElement.nativeElement as HTMLElement;
    const itemHTML = (list.last as ElementRef).nativeElement as HTMLElement;
    console.log(itemHTML.scrollHeight);

    streamHTML.scroll({
      top: streamHTML.scrollHeight - itemHTML.scrollHeight - 20,
      left: 0,
      behavior: 'smooth',
    });
  }


  test() {
    return 'd'
  }
}
