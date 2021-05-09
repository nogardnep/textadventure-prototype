import { Caracteristic } from 'src/game/modules/base/models/Caracteristic';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
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
export class PlayerComponent implements OnInit, OnChanges {
  @Input() entity: Entity;
  player: Character;
  caracteristics: { [key: string]: Caracteristic };
  caracteristicNames = CARACTERISTIC_NAMES;
  text: { [key: string]: TextWrapper } = {
    caracteristics: { fr: 'caracteristiques', en: 'caracteristics' },
  };

  constructor(private gameService: GameService) {}

  ngOnChanges() {
    this.player = this.entity as Character;
  }

  getCaracteristicEffectiveValue(key: string): number {
    return (this.player as Character).getEffectiveCaracteristicValue(key);
  }

  getModifier(key: string): number {
    return (this.player as Character).getCaracteristicModifiers(key);
  }

  getInventoryObjects(): Entity[] {
    return (this.player as Character).getInventoryObjects();
  }

  getWornObjects(): Entity[] {
    return (this.player as Character).getWornObjects();
  }

  getHeldObjects(): Entity[] {
    return (this.player as Character).getHeldObjects();
  }

  ngOnInit() {}
}
