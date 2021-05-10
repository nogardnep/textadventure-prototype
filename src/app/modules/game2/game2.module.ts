import { ParagraphsComponent } from './components/paragraphs/paragraphs.component';
import { LocationComponent } from './components/location/location.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { ChoicesComponent } from './components/choices/choices.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { Game2RoutingModule } from './game2-routing.module';
import { GamePage } from './pages/game/game.page';

@NgModule({
  imports: [
    SharedModule,
    Game2RoutingModule,
    CommonModule,
    // CommonModule,
    // FormsModule,
    // IonicModule,
  ],
  declarations: [
    GamePage,
    ChoicesComponent,
    ConnectionsComponent,
    LocationComponent,
    ParagraphsComponent,
  ],
})
export class Game2Module {}
