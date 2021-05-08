import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageKey, LANGUAGE_NAMES } from 'src/game/dictionnaries/Language';
import { ConfigData, ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit, OnDestroy {
  data: ConfigData;
  languageKeys = LanguageKey;
  languageNames = LANGUAGE_NAMES;

  private dataSubscription: Subscription;

  constructor(
    private configService: ConfigService,
    private location: Location
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
    this.location.back();
  }

  onValueChange(): void {
    this.configService.save();
  }

  // onLanguageChange(): void {

  // }
}
