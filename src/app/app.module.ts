import { DebugComponent } from './components/debug/debug.component';
import { PrompterComponent } from './components/prompter/prompter.component';
import { NewPlayPage } from './pages/new-play/new-play.page';
import { GamePage } from './pages/game/game.page';
import { ConfigPage } from './pages/config/config.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectionComponent } from './components/selection/selection.component';
import { HomePage } from './pages/home/home.page';
import { EntityComponent } from './components/entity/entity.component';
import { ActionsComponent } from './components/entity/actions/actions.component';
import { LocationComponent } from './components/location/location.component';
import { EntityPreviewComponent } from './components/entity/entity-preview/entity-preview.component';
import { NarrationComponent } from './components/narration/narration.component';
import { PositionComponent } from './components/position/position.component';
import { TextPipe } from './pipes/text.pipe';
import { NamePipe } from './pipes/name.pipe';
import { InformComponent } from './components/inform/inform.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParagraphsComponent } from './components/entity/paragraphs/paragraphs.component';
import { PlayerComponent } from './components/player/player.component';

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
    DebugComponent
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
