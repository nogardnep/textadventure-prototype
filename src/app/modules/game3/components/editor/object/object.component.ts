import { Component, Input, OnInit } from '@angular/core';
import { UsuableObject } from 'src/game/modules/story/main';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss'],
})
export class ObjectComponent implements OnInit {
  @Input() object: UsuableObject;

  constructor() {}

  ngOnInit() {}
}
