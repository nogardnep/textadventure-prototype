import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigPage } from './pages/config/config.page';
import { ConversationPage } from './pages/conversation/conversation.page';
import { GamePage } from './pages/game/game.page';
import { HomePage } from './pages/home/home.page';
import { MessagesPage } from './pages/messages/messages.page';
import { NewPlayPage } from './pages/new-play/new-play.page';
import { PlayerPage } from './pages/player/player.page';
import { SelectionPage } from './pages/selection/selection.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
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
    path: 'conversation/:id',
    component: ConversationPage,
  },
  {
    path: 'messages',
    component: MessagesPage,
  },
  {
    path: 'game',
    component: GamePage,
  },
  {
    path: 'config',
    component: ConfigPage,
  },
  {
    path: 'new-play',
    component: NewPlayPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Game1RoutingModule {}
