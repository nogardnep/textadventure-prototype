import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { HomePage } from './../game1/pages/home/home.page';
import { SharedModule } from './../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { ConfigPage } from './pages/config/config.page';
import { NewPlayPage } from './pages/new-play/new-play.page';

@NgModule({
  declarations: [NewPlayPage, ConfigPage, HomePage],
  entryComponents: [],
  imports: [
    SharedModule,
    MainRoutingModule,
    CommonModule,
    FormsModule,
    // IonicModule.forRoot(),
    // IonicStorageModule.forRoot(),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Storage,
  ],
  bootstrap: [],
})
export class MainModule {}
