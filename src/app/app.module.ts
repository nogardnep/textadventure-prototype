import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DebugComponent } from './components/debug/debug.component';
import { ActionsComponent } from './components/entity/actions/actions.component';
import { ChoicesComponent } from './components/entity/choices/choices.component';
import { ConnectionsComponent } from './components/entity/connections/connections.component';
import { EntityListComponent } from './components/entity/entity-list/entity-list.component';
import { EntityPreviewComponent } from './components/entity/entity-preview/entity-preview.component';
import { EntityComponent } from './components/entity/entity.component';
import { ParagraphsComponent } from './components/entity/paragraphs/paragraphs.component';
import { InformComponent } from './components/inform/inform.component';
import { LocationComponent } from './components/location/location.component';
import { NarrationComponent } from './components/narration/narration.component';
import { PlayerComponent } from './components/player/player.component';
import { PositionComponent } from './components/position/position.component';
import { PrompterComponent } from './components/prompter/prompter.component';
import { SelectionComponent } from './components/selection/selection.component';
import { ConfigPage } from './pages/config/config.page';
import { GamePage } from './pages/game/game.page';
import { HomePage } from './pages/home/home.page';
import { NewPlayPage } from './pages/new-play/new-play.page';
import { NamePipe } from './pipes/name.pipe';
import { TextPipe } from './pipes/text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    EntityComponent,
    ActionsComponent,
    LocationComponent,
    SelectionComponent,
    EntityPreviewComponent,
    NarrationComponent,
    PositionComponent,
    PositionComponent,
    TextPipe,
    NamePipe,
    InformComponent,
    ParagraphsComponent,
    PlayerComponent,
    ConfigPage,
    GamePage,
    NewPlayPage,
    PrompterComponent,
    DebugComponent,
    EntityListComponent,
    ChoicesComponent,
    ConnectionsComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Storage,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
