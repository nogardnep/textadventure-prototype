import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onClickHome(): void {
    this.router.navigate(['/']);
  }

  onClickConfig(): void {
    this.router.navigate(['/config']);
  }
}
