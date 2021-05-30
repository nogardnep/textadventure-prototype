import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.page.html',
  styleUrls: ['./page-container.page.scss'],
})
export class PageContainer {
  @Input() type: string;

  constructor() {}
}
