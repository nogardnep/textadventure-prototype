import { InterfaceService } from 'src/app/services/interface.service';
import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { GameService } from 'src/app/services/game.service';
import { Choice } from 'src/game/core/models/Choice';
import { BaseActionKeys } from 'src/game/modules/base/dictionnaries/actions';
import { Spell } from 'src/game/modules/base/models/entities/immaterial/Spell';
import { ParagraphTag } from 'src/game/core/models/Paragraph';

@Component({
  selector: 'app-player-preview',
  templateUrl: './player-preview.component.html',
  styleUrls: ['./player-preview.component.scss'],
})
export class PlayerPreviewComponent implements OnInit {
  @Input() player: Character;

  constructor(
    private gameService: GameService,
    private interfaceService: InterfaceService
  ) {}

  ngOnInit() {}

  onClickPlayer(): void {
    this.interfaceService.goToPlayer();
  }

  onClickCastSpell(): void {
    const choices: Choice[] = [];
    const spells = [];
    const action = this.player.getPlay().getAction(BaseActionKeys.CastingOn);

    this.player.getSpells().forEach((item) => {
      if (action.check(this.player, [item], true).usable) {
        spells.push(item);
      }
    });

    if (spells.length > 0) {
      spells.forEach((item: Spell) => {
        choices.push({
          text: item.getName().printSimple(true),
          proceed: () => {
            action.use(this.player, [item]);
          },
          check: () => {
            return action.check(this.player, [item], true).usable;
          },
        });
      });

      choices.push({
        text: 'Annuler',
        proceed: () => {},
      });

      this.interfaceService.openPopup(
        [
          {
            text: 'Quel sort voulez-vous lancer&nbsp?',
            tag: ParagraphTag.Information,
          },
        ],
        choices
      );
    } else {
      this.interfaceService.openPopup([
        {
          text: 'Vous ne pouvez lancer aucun sort.',
          tag: ParagraphTag.Information,
        },
      ]);
    }
  }
}
