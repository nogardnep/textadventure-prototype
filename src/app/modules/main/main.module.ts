import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NewPlayPage } from './pages/new-play/new-play.page';
import { HomePage } from './../game1/pages/home/home.page';
import { ConfigPage } from './pages/config/config.page';
import { SharedModule } from './../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [NewPlayPage, ConfigPage, HomePage],
  entryComponents: [],
  imports: [
    SharedModule,
    // // AppModule,
    CommonModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    FormsModule,
    MainRoutingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Storage,
  ],
  bootstrap: [],
})
export class MainModule {}
