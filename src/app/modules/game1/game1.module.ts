import { TimeComponent } from './components/time/time.component';
import { IonicModule } from '@ionic/angular';
import { CaracteristicsComponent } from './components/caracteristics/caracteristics.component';
import { CaracteristicModifiersComponent } from './components/caracteristic-modifiers/caracteristic-modifiers.component';
import { PlayerPreviewComponent } from './components/player/player-preview/player-preview.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { MessagesPage } from './pages/messages/messages.page';
import { SelectionPage } from './pages/selection/selection.page';
import { PlayerPage } from './pages/player/player.page';
import { MessagesComponent } from './components/messages/messages.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { DebugComponent } from './components/debug/debug.component';
import { EntityWindowComponent } from './components/entity-window/entity-window.component';
import { ActionsComponent } from './components/entity/actions/actions.component';
import { ChoicesComponent } from './components/entity/choices/choices.component';
import { ConnectionsComponent } from './components/entity/connections/connections.component';
import { EntityListComponent } from './components/entity/entity-list/entity-list.component';
import { EntityPreviewComponent } from './components/entity/entity-preview/entity-preview.component';
import { EntityFullComponent } from './components/entity/entity-full/entity-full.component';
import { ParagraphsComponent } from './components/paragraphs/paragraphs.component';
import { InfoComponent } from './components/info/info.component';
import { LocationComponent } from './components/location/location.component';
import { NarrationComponent } from './components/narration/narration.component';
import { PlayerFullComponent } from './components/player/player-full/player-full.component';
import { PrompterComponent } from './components/prompter/prompter.component';
import { SelectionComponent } from './components/selection/selection.component';
import { Game1RoutingModule } from './game1-routing.module';
import { GamePage } from './pages/game/game.page';
import { ActionButtonComponent } from './components/action-button/action-button.component';

@NgModule({
  imports: [
    SharedModule,
    Game1RoutingModule,
    CommonModule,
    IonicModule.forRoot(),
  ],
  declarations: [
    GamePage,
    SelectionPage,
    MessagesPage,
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
  ],
})
export class Game1Module {}
