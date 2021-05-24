import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ChoicesComponent } from './components/choices/choices.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { LocationComponent } from './components/location/location.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ParagraphsComponent } from './components/paragraphs/paragraphs.component';
import { Game2RoutingModule } from './game2-routing.module';
import { GamePage } from './pages/game/game.page';

@NgModule({
  imports: [
    SharedModule,
    Game2RoutingModule,
    CommonModule,
    // CommonModule,
    // FormsModule,
    IonicModule.forRoot(),
  ],
  declarations: [
    GamePage,
    ChoicesComponent,
    ConnectionsComponent,
    LocationComponent,
    ParagraphsComponent,
    MessagesComponent,
  ],
})
export class Game2Module {}
