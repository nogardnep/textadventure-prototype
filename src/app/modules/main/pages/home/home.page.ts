import { INTERFACE_ID } from 'src/app/services/game.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private gameService: GameService, private router: Router) {}

  onClickNew(): void {
    this.gameService.openPopup(
      [{ text: 'Êtes-vous sûr&nbsp;?' }],
      [
        {
          text: 'Oui',
          proceed: () => {
            this.router.navigate(['/new-play']);
          },
        },
        {
          text: 'Non',
          proceed: () => {},
        },
      ]
    );
  }

  onClickLoad(): void {
    this.gameService.loadLastPlay();
    this.router.navigate(['/' + INTERFACE_ID]);
  }

  onClickConfig(): void {
    this.router.navigate(['/config']);
  }
}
