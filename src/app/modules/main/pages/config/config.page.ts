import { AudioChannelKey,AUDIO_CHANNEL_NAMES } from 'src/app/services/audio.service';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigData, ConfigService } from 'src/app/services/config.service';
import {
  LanguageKey,
  LANGUAGE_NAMES,
} from 'src/game/core/dictionnaries/Language';
import { ButtonType, InterfaceService } from 'src/app/services/interface.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit, OnDestroy {
  data: ConfigData;
  languageKeys = LanguageKey;
  audioChannelKey = AudioChannelKey;
  languageNames = LANGUAGE_NAMES;
  channelNames = AUDIO_CHANNEL_NAMES;

  private dataSubscription: Subscription;

  constructor(
    private configService: ConfigService,
    private location: Location,
    private interfaceService: InterfaceService
  ) {}

  ngOnInit() {
    this.dataSubscription = this.configService.dataSubject.subscribe(
      (data: ConfigData) => {
        this.data = data;
      }
    );
    this.configService.emitData();
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  onClickBack(): void {
    this.interfaceService.onClickButton(ButtonType.Validation);
    this.location.back();
  }

  onValueChange(): void {
    this.configService.save();
  }
}
