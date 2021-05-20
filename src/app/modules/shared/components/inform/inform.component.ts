import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Choice } from 'src/game/core/models/Choice';
import { Paragraph } from 'src/game/core/models/Paragraph';
import { TextWrapper } from 'src/game/core/TextManager';

@Component({
  selector: 'app-inform',
  templateUrl: './inform.component.html',
  styleUrls: ['./inform.component.scss'],
})
export class InformComponent implements OnInit {
  choices: Choice[];
  paragraphs: Paragraph[];
  text: { [key: string]: TextWrapper } = {
    close: { fr: 'fermer', en: 'close' },
  };

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onClickOption(action?: Choice): void {
    this.modalController.dismiss();

    if (action) {
      action.proceed();
    }
  }
}
