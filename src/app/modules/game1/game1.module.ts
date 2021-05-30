import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from './../shared/shared.module';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { CaracteristicModifiersComponent } from './components/caracteristic-modifiers/caracteristic-modifiers.component';
import { CaracteristicsComponent } from './components/caracteristics/caracteristics.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { DebugComponent } from './components/debug/debug.component';
import { EntityWindowComponent } from './components/entity-window/entity-window.component';
import { ActionsComponent } from './components/entity/actions/actions.component';
import { ChoicesComponent } from './components/entity/choices/choices.component';
import { ConnectionsComponent } from './components/entity/connections/connections.component';
import { EntityFullComponent } from './components/entity/entity-full/entity-full.component';
import { EntityListComponent } from './components/entity/entity-list/entity-list.component';
import { EntityPreviewComponent } from './components/entity/entity-preview/entity-preview.component';
import { InfoComponent } from './components/info/info.component';
import { LocationComponent } from './components/location/location.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MessageComponent } from './components/message/message.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NarrationComponent } from './components/narration/narration.component';
import { ParagraphsComponent } from './components/paragraphs/paragraphs.component';
import { PlayerFullComponent } from './components/player/player-full/player-full.component';
import { PlayerPreviewComponent } from './components/player/player-preview/player-preview.component';
import { PrompterComponent } from './components/prompter/prompter.component';
import { SelectionComponent } from './components/selection/selection.component';
import { TimeComponent } from './components/time/time.component';
import { Game1RoutingModule } from './game1-routing.module';
import { BasePage } from './pages/base-page/base-page.page';
import { ConfigPage } from './pages/config/config.page';
import { ConversationPage } from './pages/conversation/conversation.page';
import { GamePage } from './pages/game/game.page';
import { HomePage } from './pages/home/home.page';
import { MessagesPage } from './pages/messages/messages.page';
import { NewPlayPage } from './pages/new-play/new-play.page';
import { PageContainer } from './pages/page-container/page-container.page';
import { PlayerPage } from './pages/player/player.page';
import { SelectionPage } from './pages/selection/selection.page';

@NgModule({
  imports: [
    SharedModule,
    Game1RoutingModule,
    CommonModule,
    IonicModule.forRoot(),
  ],
  declarations: [
    HomePage,
    ConfigPage,
    NewPlayPage,
    GamePage,
    SelectionPage,
    MessagesPage,
    ConversationPage,
    DebugComponent,
    EntityFullComponent,
    EntityListComponent,
    EntityPreviewComponent,
    ActionsComponent,
    ChoicesComponent,
    NarrationComponent,
    PlayerFullComponent,
    LocationComponent,
    SelectionComponent,
    PrompterComponent,
    InfoComponent,
    ParagraphsComponent,
    ConnectionsComponent,
    EntityWindowComponent,
    ConversationComponent,
    MessagesComponent,
    PlayerPage,
    ActionButtonComponent,
    BackButtonComponent,
    PlayerPreviewComponent,
    CaracteristicModifiersComponent,
    CaracteristicsComponent,
    TimeComponent,
    MainMenuComponent,
    PageContainer,
    BasePage,
    MessageComponent
  ],
})
export class Game1Module {}
