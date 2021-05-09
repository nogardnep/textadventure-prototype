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
import { EntityComponent } from './components/entity/entity.component';
import { ParagraphsComponent } from './components/entity/paragraphs/paragraphs.component';
import { InfoComponent } from './components/info/info.component';
import { LocationComponent } from './components/location/location.component';
import { NarrationComponent } from './components/narration/narration.component';
import { PlayerComponent } from './components/player/player.component';
import { PositionComponent } from './components/position/position.component';
import { PrompterComponent } from './components/prompter/prompter.component';
import { SelectionComponent } from './components/selection/selection.component';
import { Game1RoutingModule } from './game1-routing.module';
import { GamePage } from './pages/game/game.page';

@NgModule({
  imports: [
    SharedModule,
    Game1RoutingModule,
    CommonModule,
    // FormsModule,
    // IonicModule,
  ],
  declarations: [
    GamePage,
    DebugComponent,
    EntityComponent,
    EntityListComponent,
    EntityPreviewComponent,
    ActionsComponent,
    ChoicesComponent,
    NarrationComponent,
    PlayerComponent,
    LocationComponent,
    PositionComponent,
    SelectionComponent,
    PrompterComponent,
    InfoComponent,
    ParagraphsComponent,
    ConnectionsComponent,
    EntityWindowComponent,
    ConversationComponent,
  ],
})
export class Game1Module {}
