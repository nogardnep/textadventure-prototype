import { SelectionPage } from './pages/selection/selection.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamePage } from './pages/game/game.page';
import { PlayerPage } from './pages/player/player.page';
import { MessagesPage } from './pages/messages/messages.page';

const routes: Routes = [
  {
    path: '',
    component: GamePage,
  },
  {
    path: 'player',
    component: PlayerPage,
  },
  {
    path: 'selection/:id',
    component: SelectionPage,
  },
  {
    path: 'messages',
    component: MessagesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Game1RoutingModule {}
