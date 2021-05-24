import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioLayerKey, AudioService } from 'src/app/services/audio.service';
import { GameService } from 'src/app/services/game.service';
import { InterfaceService } from 'src/app/services/interface.service';
import { Audio } from 'src/game/core/models/Audio';
import { ParagraphTag } from 'src/game/core/models/Paragraph';
import { ButtonType } from './../../../../services/interface.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  lastPlayExists: boolean = false;

  constructor(
    private gameService: GameService,
    private interfaceService: InterfaceService,
    private audioService: AudioService
  ) {}

  ngOnInit() {
    this.gameService.getStoredPlay().then((stored) => {
      this.lastPlayExists = stored ? true : false;
    });

    this.audioService.clearLayer(AudioLayerKey.LocationAmbiance);
    this.audioService.play(
      new Audio('interface/audios/home.wav', 0.2),
      AudioLayerKey.LocationAmbiance,
      {
        loop: true,
        fade: true,
      }
    );
  }

  ngOnDestroy() {
    this.audioService.clearLayer(AudioLayerKey.LocationAmbiance);
  }

  onClickNew(): void {
    this.interfaceService.onClickButton(ButtonType.Validation);

    if (this.lastPlayExists) {
      this.interfaceService.openPopup(
        [{ tag: ParagraphTag.Information, text: 'Êtes-vous sûr&nbsp;?' }],
        [
          {
            text: 'Oui',
            proceed: () => {
              this.openNewPage();
            },
          },
          {
            text: 'Non',
            proceed: () => {},
          },
        ]
      );
    } else {
      this.openNewPage();
    }
  }

  private openNewPage(): void {
    this.interfaceService.goToNewPlay();
  }

  onClickLoad(): void {
    this.interfaceService.onClickButton(ButtonType.Validation);
    this.interfaceService.goToGame();
  }

  onClickConfig(): void {
    this.interfaceService.onClickButton(ButtonType.Simple);
    this.interfaceService.goToConfig();
  }
}
