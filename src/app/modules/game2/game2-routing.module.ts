import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigPage } from './pages/config/config.page';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Game2RoutingModule {}
