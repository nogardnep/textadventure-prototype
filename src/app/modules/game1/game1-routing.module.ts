import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationPage } from './pages/conversation/conversation.page';
import { GamePage } from './pages/game/game.page';
import { MessagesPage } from './pages/messages/messages.page';
import { PlayerPage } from './pages/player/player.page';
import { SelectionPage } from './pages/selection/selection.page';


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
    path: 'conversation/:id',
    component: ConversationPage,
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
