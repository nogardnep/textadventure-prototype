import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { Game2RoutingModule } from './game2-routing.module';
import { GamePage } from './pages/game/game.page';

@NgModule({
  imports: [
    SharedModule,
    Game2RoutingModule,
    // CommonModule,
    // FormsModule,
    // IonicModule,
  ],
  declarations: [GamePage],
})
export class Game2Module {}
