import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InterfaceService } from 'src/app/services/interface.service';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent implements OnInit {
  @Output() clickEvent = new EventEmitter();
  @Input() text: string;

  constructor(private interfaceService: InterfaceService) {}

  ngOnInit() {}

  onClick() {
    this.interfaceService.onClickButton();
    this.clickEvent.emit(null);
  }
}
