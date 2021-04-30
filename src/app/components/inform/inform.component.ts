import { Paragraph } from './../../../game/models/Paragraph';
import { TextWrapper } from './../../../game/models/Text';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Action } from 'src/game/models/Action';

@Component({
  selector: 'app-inform',
  templateUrl: './inform.component.html',
  styleUrls: ['./inform.component.scss'],
})
export class InformComponent implements OnInit {
  actions: Action[];
  paragraphs: Paragraph[];
  text: { [key: string]: TextWrapper } = {
    close: { fr: 'fermer', en: 'close' },
  };

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    console.log(this.actions);
  }

  onClickOption(action?: Action): void {
    this.modalController.dismiss();

    if (action) {
      action.proceed();
    }
  }
}
