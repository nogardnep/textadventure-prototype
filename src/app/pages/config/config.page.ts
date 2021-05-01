import { languageKeys, languageNames } from 'src/game/enums/Language';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../services/config.service';
import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigData } from '../../services/config.service';
import { TextManager } from 'src/game/TextManager';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit, OnDestroy {
  data: ConfigData;
  languageKeys = languageKeys;
  languageNames = languageNames;

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
