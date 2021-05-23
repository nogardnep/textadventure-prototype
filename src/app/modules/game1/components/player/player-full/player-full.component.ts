import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { TextWrapper } from 'src/game/core/TextManager';
import { BASE_CARACTERISTIC_NAMES } from 'src/game/modules/base/dictionnaries/caracteristics';
import { Caracteristic } from 'src/game/modules/base/models/Caracteristic';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { UsuableObject } from 'src/game/modules/base/models/entities/material/thing/UsuableObject';

@Component({
  selector: 'app-player-full',
  templateUrl: './player-full.component.html',
  styleUrls: ['./player-full.component.scss'],
})
export class PlayerFullComponent implements OnInit {
  @Input() player: Character;
  text: { [key: string]: TextWrapper } = {
    caracteristics: { fr: 'caracteristiques', en: 'caracteristics' },
  };

  constructor() {}

  getInventoryObjects(): UsuableObject[] {
    return this.player.getInventoryObjects();
  }

  getWornObjects(): UsuableObject[] {
    return this.player.getWornObjects();
  }

  getHeldObjects(): UsuableObject[] {
    return this.player.getHeldObjects();
  }

  ngOnInit() {}
}
