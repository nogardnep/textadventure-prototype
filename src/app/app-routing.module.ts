import { ConfigPage } from './pages/config/config.page';
import { HomePage } from './pages/home/home.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NewPlayPage } from './pages/new-play/new-play.page';
import { GamePage } from './pages/game/game.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
