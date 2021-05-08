import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private gameService: GameService, private router: Router) {
  }

  onClickNew(): void {
    this.router.navigate(['/new-play']);
    // this.gameService.inform(
    //   [{ text: { fr: 'Êtes-vous sûr&nbsp;?' } }],
    //   [
    //     {
    //       text: { fr: 'Oui' },
    //       proceed: () => {
    //         this.router.navigate(['/new-play']);
    //       },
    //     },
    //     {
    //       text: { fr: 'Non' },
    //       proceed: () => {},
    //     },
    //   ]
    // );
  }

  onClickLoad(): void {
    this.gameService.loadLastPlay();
    this.router.navigate(['/game']);
  }

  onClickConfig(): void {
    this.router.navigate(['/config']);
  }
}
