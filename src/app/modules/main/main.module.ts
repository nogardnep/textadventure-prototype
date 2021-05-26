import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { ConfigPage } from './pages/config/config.page';
import { HomePage } from './pages/home/home.page';
import { NewPlayPage } from './pages/new-play/new-play.page';

@NgModule({
  declarations: [NewPlayPage, ConfigPage, HomePage],
  entryComponents: [],
  imports: [
    SharedModule,
    MainRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Storage,
  ],
  bootstrap: [],
  exports: [
    IonicModule,
  ]
})
export class MainModule {}
