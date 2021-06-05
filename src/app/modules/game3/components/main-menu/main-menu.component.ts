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
  constructor(private interfaceService: InterfaceService) {}

  ngOnInit() {}

  onClickHome(): void {
    this.interfaceService.onClickButton(ButtonType.Simple);
    this.interfaceService.goToHome();
  }

  onClickConfig(): void {
    this.interfaceService.onClickButton(ButtonType.Simple);
    this.interfaceService.goToConfig();
  }
}
