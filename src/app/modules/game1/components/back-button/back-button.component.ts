import { Location } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent implements OnInit {

  constructor(private location: Location) {}

  ngOnInit() {}

  onClick(): void {
    this.location.back();
  }
}
