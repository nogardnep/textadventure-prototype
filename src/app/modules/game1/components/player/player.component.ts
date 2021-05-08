import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Entity } from 'src/game/core/models/Entity';
import { TextWrapper } from 'src/game/core/models/Text';
import { CARACTERISTIC_NAMES } from 'src/game/modules/base/dictionnaries/caracteristics';
import { Character } from 'src/game/modules/base/models/entities/material/Character';

@Component({
  selector: 'component-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() player: Character;
  caracteristicNames = CARACTERISTIC_NAMES;
  text: { [key: string]: TextWrapper } = {
    caracteristics: { fr: 'caracteristiques', en: 'caracteristics' },
  };

  constructor(private gameService: GameService) {}

  getCaracteristicEffectiveValue(key: string): number {
    return this.player.getEffectiveCaracteristicValue(key);
  }

  getModifier(key: string): number {
    return this.player.getCaracteristicModifiers(key);
  }

  getInventoryObjects(): Entity[] {
    return this.player.getInventoryObjects();
  }

  getWornObjects(): Entity[] {
    return this.player.getWornObjects();
  }

  getHeldObjects(): Entity[] {
    return this.player.getHeldObjects();
  }

  ngOnInit() {}
}
