import { ScenarioPage } from './pages/editor/scenario/scenario.page';
import { CharacterPage } from './pages/editor/character/character.page';
import { ObjectPage } from './pages/editor/object/object.page';
import { ScenePage } from './pages/editor/scene/scene.page';
import { ChapterPage } from './pages/editor/chapter/chapter.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigPage } from './pages/config/config.page';
import { EditorPage } from './pages/editor/editor.page';

import { GamePage } from './pages/game/game.page';
import { HomePage } from './pages/home/home.page';
import { NewPlayPage } from './pages/new-play/new-play.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'config',
    component: ConfigPage,
  },
  {
    path: 'new-play',
    component: NewPlayPage,
  },
  {
    path: 'game',
    component: GamePage,
  },
  {
    path: 'editor',
    children: [
      {
        path: '',
        component: ScenarioPage,
      },
      {
        path: 'chapter/:id',
        component: ChapterPage,
      },
      {
        path: 'scene/:id',
        component: ScenePage,
      },
      {
        path: 'object/:id',
        component: ObjectPage,
      },
      {
        path: 'character/:id',
        component: CharacterPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Game3RoutingModule {}
