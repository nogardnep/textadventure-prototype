import {
  ButtonType,
  InterfaceService,
} from 'src/app/services/interface.service';
import { Location } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent implements OnInit {
  constructor(
    private location: Location,
    private interfaceService: InterfaceService
  ) {}

  ngOnInit() {}

  onClick(): void {
    this.interfaceService.onClickButton(ButtonType.Back);
    this.location.back();
  }
}
