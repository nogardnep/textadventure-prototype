import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/game/models/entities/Character';
import { Spell } from 'src/game/models/entities/Spell';
import { CARACTERISTIC_NAMES } from '../../../game/enums/Caracteristic';
import { GameController } from './../../../game/GameController';
import { EntityType } from './../../../game/models/Entity';
import { Scenario } from './../../../game/models/Scenario';
import { TextWrapper } from './../../../game/models/Text';
import { GameService } from './../../services/game.service';

@Component({
  selector: 'app-new-play',
  templateUrl: './new-play.page.html',
  styleUrls: ['./new-play.page.scss'],
})
export class NewPlayPage implements OnInit {
  selectedSpells: Spell[] = [];
  usedPoints: number = 0;
  scenario: Scenario;
  readonly text: { [key: string]: TextWrapper } = {
    validate: { fr: 'Valider', en: 'Validate' },
    cancel: { fr: 'Annuler', en: 'Cancel' },
    spells: { fr: 'Sorts', en: 'Spells' },
    title: { fr: 'Nouvelle partie', en: 'New play' },
    caracteristics: { fr: 'Caracteristics', en: 'Caracteristics' },
  };
  name: string;
  caracteristicNames = CARACTERISTIC_NAMES;
  caracteristicModifiers: {} = {};
  availableSpells: Spell[] = [];
  player: Character;

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    GameController.startNewPlay(this.gameService.getCurrentScenario());


    this.player = GameController.getPlay().getPlayer() as Character;
    this.scenario = GameController.getPlay().getScenario();

    for (let key in this.player.caracteristics) {
      this.caracteristicModifiers[key] = 0;
    }

    this.scenario.starting.availableSpells.forEach((type: EntityType) => {
      this.availableSpells.push(
        new this.scenario.entityConstructors[type]() as Spell
      );
    });

    this.onClickValidate();
  }

  onClickValidate(): void {
    let valid = true;

    if (this.scenario.starting.askForName && !this.name) {
      valid = false;
      this.gameService.inform([{ text: { en: 'please enter a name' } }]);
    }

    if (valid) {
      this.selectedSpells.forEach((item: Spell) => {
        this.player.giveSpell(item.getId());
      });

      for (let key in this.player.caracteristics) {
        const caracteristic = this.player.caracteristics[key];
        caracteristic.max += this.caracteristicModifiers[key];
        caracteristic.current = caracteristic.max;
      }

      GameController.getPlay().getScenario().start()
      this.router.navigate(['/game']);
    }
  }

  onClickAddPoint(key: string): void {
    this.usedPoints++;
    this.caracteristicModifiers[key]++;
  }

  onClickRemovePoint(key: string): void {
    this.usedPoints--;
    if (this.caracteristicModifiers[key] - 1 >= 0) {
      this.caracteristicModifiers[key]--;
    }
  }

  onClickCancel(): void {
    this.router.navigate(['']);
  }

  onClickSpell(spell: Spell): void {
    if (this.spellIsSelected(spell)) {
      this.unselectSpell(spell);
    } else {
      if (this.selectedSpells.length < this.scenario.starting.maxSpells) {
        this.selectSpell(spell);
      }
    }
  }

  spellIsSelected(spell: Spell): boolean {
    let selected = false;

    this.selectedSpells.forEach((item: Spell) => {
      if (item.isSameAs(spell)) {
        selected = true;
      }
    });

    return selected;
  }

  private selectSpell(spell: Spell): void {
    this.selectedSpells.push(spell);
  }

  private unselectSpell(spell: Spell): void {
    this.selectedSpells.forEach((item: Spell, index: number) => {
      if (item.isSameAs(spell)) {
        this.selectedSpells.splice(index, 1);
      }
    });
  }
}
