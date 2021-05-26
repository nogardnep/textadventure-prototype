import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundPage } from './modules/main/pages/not-found/not-found.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'game1',
    loadChildren: () =>
      import('./modules/game1/game1.module').then((m) => m.Game1Module),
  },
  {
    path: 'game2',
    loadChildren: () =>
      import('./modules/game2/game2.module').then((m) => m.Game2Module),
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundPage,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
