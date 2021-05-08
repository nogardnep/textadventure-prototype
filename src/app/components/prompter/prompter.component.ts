import { GameController } from 'src/game/core/GameController';
import { GameService } from 'src/app/services/game.service';
import { Component, OnInit } from '@angular/core';

enum Keybord {
  Enter = 13,
}

@Component({
  selector: 'app-prompter',
  templateUrl: './prompter.component.html',
  styleUrls: ['./prompter.component.scss'],
})
export class PrompterComponent implements OnInit {
  text: string;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  onKeyDown(event: any): void {
    if (event.keyCode === Keybord.Enter) {
      this.execute;
    }
  }

  onClickExecute(): void {
    this.execute();
  }

  private execute(): void {
    if (this.text) {
      GameController.interpret(this.text)
    }

    this.empty();
  }

  private empty(): void {
    this.text = null;
  }
}
