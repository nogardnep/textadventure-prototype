import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPlayPageRoutingModule } from './new-play-routing.module';

import { NewPlayPage } from './new-play.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPlayPageRoutingModule
  ],
  declarations: [NewPlayPage]
})
export class NewPlayPageModule {}
