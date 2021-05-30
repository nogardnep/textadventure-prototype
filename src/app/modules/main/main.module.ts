import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { HomePage } from './pages/home/home.page';

@NgModule({
  declarations: [
    HomePage,
  ],
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
