import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.page.html',
  styleUrls: ['./base-page.page.scss'],
})
export class BasePage implements OnInit {
  @Input() type: string;
  @Input() pageTitle: string;

  constructor() {}

  ngOnInit() {}
}
