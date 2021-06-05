import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  links: { label: string; href: string }[] = [
    {
      label: 'Game 1',
      href: '/game1',
    },
    {
      label: 'Game 2',
      href: '/game2',
    },
    {
      label: 'Game 3',
      href: '/game3',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
