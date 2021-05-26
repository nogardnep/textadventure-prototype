import { ButtonType } from './../../../../services/interface.service';
import { ParagraphTag } from 'src/game/core/models/Paragraph';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { InterfaceService } from 'src/app/services/interface.service';
import { EntityType } from 'src/game/core/models/Entity';
import { Play } from 'src/game/core/models/Play';
import { TextWrapper } from 'src/game/core/TextManager';
import { BASE_CARACTERISTIC_NAMES } from 'src/game/modules/base/dictionnaries/caracteristics';
import { BaseScenario } from 'src/game/modules/base/models/BaseScenario';
import { Spell } from 'src/game/modules/base/models/entities/immaterial/Spell';
import { Character } from 'src/game/modules/base/models/entities/material/Character';

@Component({
  selector: 'app-new-play',
  templateUrl: './new-play.page.html',
  styleUrls: ['./new-play.page.scss'],
})
export class NewPlayPage implements OnInit {
  readonly text: { [key: string]: TextWrapper } = {
    validate: { fr: 'Valider', en: 'Validate' },
    cancel: { fr: 'Annuler', en: 'Cancel' },
    spells: { fr: 'Sorts', en: 'Spells' },
    title: { fr: 'Nouvelle partie', en: 'New play' },
    caracteristics: { fr: 'Caracteristics', en: 'Caracteristics' },
  };

  play: Play;
  selectedSpells: Spell[] = [];
  usedPoints: number = 0;
  scenario: BaseScenario;
  name: string;
  caracteristicNames = BASE_CARACTERISTIC_NAMES;
  caracteristicModifiers: {} = {};
  availableSpells: Spell[] = [];
  player: Character;

  constructor(
    private gameService: GameService,
    private interfaceService: InterfaceService
  ) {}

  ngOnInit(): void {
    this.play = this.gameService.createPlay(
      this.gameService.getCurrentScenario()
    );
    this.play.init();

    this.player = this.play.getPlayer() as Character;
    this.scenario = this.play.getScenario() as BaseScenario;

    if (this.player) {
      for (let key in this.player.getCaracteristics()) {
        this.caracteristicModifiers[key] = 0;
      }

      this.scenario.starting.availableSpells.forEach((type: EntityType) => {
        const spell = this.play.addEntity(type) as Spell;
        this.availableSpells.push(spell);
      });
    } else {
      console.error('No player found in this scenario');
    }
  }

  onClickValidate(): void {
    this.interfaceService.onClickButton(ButtonType.Validation);

    let valid = true;

    if (this.scenario.starting.askForName && !this.name) {
      valid = false;
      this.interfaceService.openPopup([
        { tag: ParagraphTag.Warning, text: 'Vous devez entrer un nom' },
      ]);
    }

    if (valid) {
      this.selectedSpells.forEach((item: Spell) => {
        this.player.giveSpell(item);
      });

      for (let key in this.player.getCaracteristics()) {
        const caracteristic = this.player.getCaracteristics()[key];
        caracteristic.max += this.caracteristicModifiers[key];
        caracteristic.current = caracteristic.max;
      }

      this.gameService.setPlay(this.play);
      this.play.save();
      this.interfaceService.goToGame();
      this.play.start();
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
    this.interfaceService.goToHome();
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

  onClickAddSpell(spell: Spell): void {
    this.selectSpell(spell);
  }

  onClickRemoveSpell(spell: Spell): void {
    this.unselectSpell(spell);
  }

  spellIsSelected(spell: Spell): boolean {
    let selected = false;

    this.selectedSpells.forEach((item: Spell) => {
      if (item.equals(spell)) {
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
      if (item.equals(spell)) {
        this.selectedSpells.splice(index, 1);
      }
    });
  }
}
