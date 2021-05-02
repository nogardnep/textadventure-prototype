import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Character } from 'src/game/models/entities/Character';
import { CARACTERISTIC_NAMES } from '../../../game/enums/Caracteristic';
import { Entity } from './../../../game/models/Entity';
import { TextWrapper } from './../../../game/models/Text';

@Component({
  selector: 'component-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnChanges {
  // @Input() entityId: EntityId;
  @Input() player: Character;
  caracteristicNames = CARACTERISTIC_NAMES;
  text: { [key: string]: TextWrapper } = {
    caracteristics: {fr: 'caracteristiques', en: 'caracteristics'},
  };

  ngOnChanges() {
    // this.player = GameController.getPlay().getEntity(this.entityId) as Character;
  }

  constructor(private gameService: GameService) {}

  getCaracteristicEffectiveValue(key: string): number {
    return this.player.getEffectiveCaracteristicValue(key);
  }

  getModifier(key: string): number {
    return this.player.getCaracteristicModifiers(key);
  }

  getInventoryObjects(): Entity[] {
    return this.player.getNotWornObjects();
  }

  getWornObjects(): Entity[] {
    return this.player.getWornObjects();
  }

  ngOnInit() {}
}
