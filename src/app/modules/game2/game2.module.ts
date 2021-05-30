import { ActionsComponent } from './components/actions/actions.component';
import { PageContainer } from './pages/page-container/page-container.page';
import { PlayerComponent } from './components/player/player.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ConfigPage } from './pages/config/config.page';
import { HomePage } from './pages/home/home.page';
import { NewPlayPage } from './pages/new-play/new-play.page';
import { ChoicesComponent } from './components/choices/choices.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { EntityComponent } from './components/entity/entity.component';
import { MessageComponent } from './components/message/message.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ParagraphItemComponent } from './components/paragraph-item/paragraph-item.component';
import { ParagraphsComponent } from './components/paragraphs/paragraphs.component';
import { Game2RoutingModule } from './game2-routing.module';
import { GamePage } from './pages/game/game.page';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { asEntity } from './pipes/as-entity.pipe';
import { AsMessage } from './pipes/as-message.pipe';

@NgModule({
  imports: [
    SharedModule,
    Game2RoutingModule,
    CommonModule,
    IonicModule.forRoot(),
  ],
  declarations: [
    PageContainer,
    GamePage,
    HomePage,
    ConfigPage,
    NewPlayPage,
    ChoicesComponent,
    ConnectionsComponent,
    EntityComponent,
    ParagraphsComponent,
    MessagesComponent,
    MessageComponent,
    ParagraphItemComponent,
    MainMenuComponent,
    PlayerComponent,
    asEntity,
    AsMessage,
    ActionsComponent
  ],
})
export class Game2Module {}
