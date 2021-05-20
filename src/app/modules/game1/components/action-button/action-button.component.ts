import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent implements OnInit {
  @Output() clickEvent = new EventEmitter();
  @Input() text: string;

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.clickEvent.emit(null);
  }
}
