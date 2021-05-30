import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Play } from 'src/game/core/models/Play';

enum Keybord {
  Enter = 13,
}

@Component({
  selector: 'app-prompter',
  templateUrl: './prompter.component.html',
  styleUrls: ['./prompter.component.scss'],
})
export class PrompterComponent implements OnInit {
  @Input() play: Play;
  text: string;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  onKeyDown(event: any): void {
    if (event.keyCode === Keybord.Enter) {
      this.execute();
    }
  }

  onClickExecute(): void {
    this.execute();
  }

  private execute(): void {
    if (this.text) {
      // GameManager.interpret(this.text)
      // console.log(this.text);
      // console.log(this.play.getScenario().getActions());
      let regex = /aller au */;
      // console.log(regex.test(this.text));

      for (let key in this.play.getScenario().getActionConstructors()) {
        const action = this.play.getScenario().getActionConstructors()[key];

        // if (action.getPattern() && action.getPattern().regExp.test(this.text)) {
        //   console.log(action)
        // }
      }

      // pattern: 'interroger * sur *'
      // pattern: 'aller au *'
      // pattern: 'aller vers/à *'
    }

    this.empty();
  }

  private empty(): void {
    this.text = null;
  }
}
// var input = userinput; //however you get it
// var commands = [/look/i, /take/i, /talk/i];
// var gameObjects = []; //push objects here as they're created

// var command = commands.filter(function(r) { return input.match(r); });
// var object = gameObjects.filter(function(obj) {
//     return input.match(new RegExp(obj.name, 'i');
// });

// if (command.length and object.length) {
//     //do stuff, remember that String.prototype.match returns an array even
//     //if there's only one match, so be sure to unbox
// }
