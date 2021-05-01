import { TextWrapper } from './../../../game/models/Text';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { GameController } from 'src/game/GameController';
import { EntityId } from 'src/game/models/Entity';
import { Character } from 'src/game/models/entity/Character';
import { caracteristicNames } from '../../../game/enums/Caracteristic';

@Component({
  selector: 'component-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnChanges {
  @Input() entityId: EntityId;
  player: Character;
  caracteristicNames = caracteristicNames;
  text: { [key: string]: TextWrapper } = {
    caracteristics: {fr: 'caracteristiques', en: 'caracteristics'},
  };

  ngOnChanges() {
    this.player = GameController.getEntity(this.entityId) as Character;
  }

  constructor(private gameService: GameService) {}

  getCaracteristicEffectiveValue(key: string): number {
    return this.player.getEffectiveCaracteristicValue(key);
  }

  getModifier(key: string): number {
    return this.player.getCaracteristicModifiers(key);
  }

  getInventoryObjects(): EntityId[] {
    return this.player.getNotWornObjects();
  }

  getWornObjects(): EntityId[] {
    return this.player.getWornObjects();
  }

  ngOnInit() {}
}
