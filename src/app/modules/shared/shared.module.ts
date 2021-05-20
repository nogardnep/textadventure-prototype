import { CapitalizeFirstPipe } from './pipes/capitalize-first';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { InformComponent } from './components/inform/inform.component';
import { NamePipe } from './pipes/name.pipe';
import { TextPipe } from './pipes/text.pipe';
import { KebabCasePipe } from './pipes/kebab-case';

@NgModule({
  declarations: [NamePipe, TextPipe, InformComponent, MainMenuComponent,
  CapitalizeFirstPipe, KebabCasePipe ],
  entryComponents: [],
  imports: [
    CommonModule,
    // BrowserModule,
    FormsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Storage,
  ],
  bootstrap: [],
  exports: [NamePipe, TextPipe, MainMenuComponent,CapitalizeFirstPipe,KebabCasePipe],
})
export class SharedModule {}
