import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ButtonType,
  InterfaceService,
} from 'src/app/services/interface.service';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent implements OnInit {
  @Output() clickEvent = new EventEmitter();
  @Input() text: string;
  @Input() disabled: boolean;

  constructor(private interfaceService: InterfaceService) {}

  ngOnInit() {}

  onClick() {
    this.interfaceService.onClickButton(ButtonType.Simple);
    this.clickEvent.emit();
  }
}
