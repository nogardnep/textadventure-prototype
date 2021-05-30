import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { InterfaceService } from 'src/app/services/interface.service';
import { Entity } from 'src/game/core/models/Entity';
import { Paragraph } from 'src/game/core/models/Paragraph';
import { TextWrapper } from 'src/game/core/TextManager';
import { Effect } from 'src/game/modules/base/models/entities/immaterial/Effect';
import { Spell } from 'src/game/modules/base/models/entities/immaterial/Spell';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { HoldableObject } from 'src/game/modules/base/models/entities/material/thing/object/HoldableObject';
import { WearableObject } from 'src/game/modules/base/models/entities/material/thing/object/WearableObject';
import { UsuableObject } from 'src/game/modules/base/models/entities/material/thing/UsuableObject';

@Component({
  selector: 'app-player-full',
  templateUrl: './player-full.component.html',
  styleUrls: ['./player-full.component.scss'],
})
export class PlayerFullComponent implements OnInit {
  @Input() player: Character;
  updateSubscription: Subscription;
  text: { [key: string]: TextWrapper } = {
    caracteristics: { fr: 'caracteristiques', en: 'caracteristics' },
  };
  inventoryObjects: UsuableObject[];
  wornObjects: WearableObject[];
  heldObjects: HoldableObject[];
  spells: Spell[];
  effects: Effect[];
  description: Paragraph[];
  name: string;

  constructor(
    private gameService: GameService,
    private interfaceService: InterfaceService
  ) {}

  ngOnInit() {
    this.updateSubscription = this.gameService.updateEvent.subscribe(() => {
      this.update();
    });
  }

  ngOnChanges() {
    this.update();
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  onItemClicked(item: Entity) {
    this.interfaceService.setSelection(item);
  }

  private update(): void {
    this.inventoryObjects = this.player.getInventoryObjects();
    this.heldObjects = this.player.getHeldObjects();
    this.wornObjects = this.player.getWornObjects();
    this.spells = this.player.getSpells();
    this.effects = this.player.getEffects();
    this.description = this.player.getFullDescription();
    this.name = this.player.getName().printWithDefiniteArticle();
  }
}
