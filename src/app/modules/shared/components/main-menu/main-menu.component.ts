import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  ButtonType,
  InterfaceService,
} from 'src/app/services/interface.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  constructor(
    private router: Router,
    private interfaceService: InterfaceService
  ) {}

  ngOnInit() {}

  onClickHome(): void {
    this.interfaceService.onClickButton(ButtonType.Simple);
    this.router.navigate(['/']);
  }

  onClickConfig(): void {
    this.interfaceService.onClickButton(ButtonType.Simple);
    this.router.navigate(['/config']);
  }
}
