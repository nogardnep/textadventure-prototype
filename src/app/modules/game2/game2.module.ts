import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from './../shared/shared.module';
import { Game2RoutingModule } from './game2-routing.module';
import { GamePage } from './pages/game/game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Game2RoutingModule,
    SharedModule,
  ],
  declarations: [GamePage],
})
export class Game2Module {}
