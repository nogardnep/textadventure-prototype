import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AudioLayerKey, AudioService } from 'src/app/services/audio.service';
import { GameService } from 'src/app/services/game.service';
import {
  ButtonType,
  InterfaceService
} from 'src/app/services/interface.service';
import { ParagraphTag } from 'src/game/core/models/Paragraph';

@Component({
  selector: 'app-home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  lastPlayExists: boolean = false;
  loading: boolean = true;
  loadingSubscription: Subscription;

  constructor(
    private gameService: GameService,
    private interfaceService: InterfaceService,
    private audioService: AudioService
  ) {}

  ngOnInit() {
    this.gameService.getStoredPlay().then((stored) => {
      this.lastPlayExists = stored ? true : false;
    });

    this.loadingSubscription = this.interfaceService.loadingSubject.subscribe(
      (loading) => {
        this.loading = loading;

        if (!this.loading) {
          this.audioService.clearLayer(AudioLayerKey.LocationAmbiance);
          this.audioService.play(
            this.interfaceService.audios.home,
            AudioLayerKey.LocationAmbiance,
            {
              loop: true,
              fadeIn: 1000,
              fadeOut: 1000,
            }
          );
        }
      }
    );

    this.interfaceService.emitLoading();
  }

  ngOnDestroy() {
    this.audioService.clearLayer(AudioLayerKey.LocationAmbiance);
    this.loadingSubscription.unsubscribe();
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
              this.interfaceService.goToNewPlay();
            },
          },
          {
            text: 'Non',
            proceed: () => {},
          },
        ]
      );
    } else {
      this.interfaceService.goToNewPlay();
    }
  }

  onClickLoad(): void {
    this.interfaceService.onClickButton(ButtonType.Validation);
    this.interfaceService.goToGame();
  }

  onClickConfig(): void {
    this.interfaceService.onClickButton(ButtonType.Simple);
    this.interfaceService.goToConfig();
  }

  onClickEditor(): void {
    this.interfaceService.onClickButton(ButtonType.Simple);
    this.interfaceService.goToEditor();
  }
}
