import { ScenarioPage } from './pages/editor/scenario/scenario.page';
import { ChapterListComponent } from './components/editor/lists/chapter-list/chapter-list.component';
import { SceneListComponent } from './components/editor/lists/scene-list/scene-list.component';
import { ObjectListComponent } from './components/editor/lists/object-list/object-list.component';
import { CharacterListComponent } from './components/editor/lists/character-list/character-list.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ActionComponent } from './components/editor/action/action.component';
import { ChapterComponent } from './components/editor/chapter/chapter.component';
import { CharacterComponent } from './components/editor/character/character.component';
import { ChoiceComponent } from './components/editor/choice/choice.component';
import { ConditionComponent } from './components/editor/condition/condition.component';
import { DataListComponent } from './components/editor/data-list/data-list.component';
import { DataComponent } from './components/editor/data/data.component';
import { SelectInputComponent } from './components/editor/inputs/select-input/select-input.component';
import { TextInputComponent } from './components/editor/inputs/text-input/text-input.component';
import { ObjectComponent } from './components/editor/object/object.component';
import { ScenarioComponent } from './components/editor/scenario/scenario.component';
import { SceneComponent } from './components/editor/scene/scene.component';
import { SnippetComponent } from './components/editor/snippet/snippet.component';
import { TreeComponent } from './components/editor/tree/tree.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { Game3RoutingModule } from './game3-routing.module';
import { ConfigPage } from './pages/config/config.page';
import { ChapterPage } from './pages/editor/chapter/chapter.page';
import { CharacterPage } from './pages/editor/character/character.page';
import { EditorPage } from './pages/editor/editor.page';
import { ObjectPage } from './pages/editor/object/object.page';
import { ScenePage } from './pages/editor/scene/scene.page';
import { GamePage } from './pages/game/game.page';
import { HomePage } from './pages/home/home.page';
import { NewPlayPage } from './pages/new-play/new-play.page';
import { PageContainer } from './pages/page-container/page-container.page';

@NgModule({
  imports: [CommonModule, IonicModule, SharedModule, Game3RoutingModule],
  declarations: [
    PageContainer,
    GamePage,
    HomePage,
    ConfigPage,
    NewPlayPage,
    MainMenuComponent,
    EditorPage,
    SnippetComponent,
    ScenarioComponent,
    SceneComponent,
    ChapterComponent,
    ChoiceComponent,
    ActionComponent,
    TextInputComponent,
    ConditionComponent,
    SelectInputComponent,
    ObjectComponent,
    CharacterComponent,
    DataComponent,
    DataListComponent,
    ChapterPage,
    ScenePage,
    TreeComponent,
    ObjectPage,
    CharacterPage,
    CharacterListComponent,
    ObjectListComponent,
    SceneListComponent,
    ChapterListComponent,
    ScenarioPage,
  ],
})
export class Game3Module {}
