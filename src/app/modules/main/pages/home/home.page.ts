import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioLayerKey, AudioService } from 'src/app/services/audio.service';
import { GameService } from 'src/app/services/game.service';
import { InterfaceService } from 'src/app/services/interface.service';
import { Audio } from 'src/game/core/models/Audio';
import { ParagraphTag } from 'src/game/core/models/Paragraph';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  lastPlayExists: boolean = false;

  constructor(
    private gameService: GameService,
    private router: Router,
    private interfaceService: InterfaceService,
    private audioService: AudioService
  ) {}

  ngOnInit() {
    this.gameService.getStoredPlay().then((stored) => {
      this.lastPlayExists = stored ? true : false;
    });

    this.audioService.clearLayer(AudioLayerKey.LocationAmbiance);
    this.audioService.play(
      new Audio('scenarios/audios/ghost.wav'),
      AudioLayerKey.LocationAmbiance,
      true,
      true
    );
  }

  ngOnDestroy() {
    this.audioService.clearLayer(AudioLayerKey.LocationAmbiance);
  }

  onClickNew(): void {
    this.interfaceService.onClickButton();

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
    this.interfaceService.onClickButton();
    this.interfaceService.goToGame();
  }

  onClickConfig(): void {
    this.interfaceService.onClickButton();
    this.interfaceService.goToConfig();
  }
}
