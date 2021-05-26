import { Component, Input, OnInit } from '@angular/core';
import { InterfaceService } from 'src/app/services/interface.service';
import { Entity } from 'src/game/core/models/Entity';
import { TextWrapper } from 'src/game/core/TextManager';
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

  constructor(private interfaceService: InterfaceService) {}

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

  onItemClicked(item: Entity) {
    this.interfaceService.setSelection(item);
  }
}
