import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { AudioService } from 'src/app/services/audio.service';
import { Audio } from 'src/game/core/models/Audio';
import { Choice } from 'src/game/core/models/Choice';
import { Entity } from 'src/game/core/models/Entity';
import { Paragraph } from 'src/game/core/models/Paragraph';
import { InformComponent } from '../modules/shared/components/inform/inform.component';
import { AudioLayerKey } from './audio.service';

const INTERFACE_ID = 'game1'; // TODO: temp

export enum ButtonType {
  Validation,
  Cancel,
  Simple,
  Back,
}

@Injectable({
  providedIn: 'root',
})
export class InterfaceService {
  private selection: Entity;
  private loading: boolean = true;
  private readonly audioPath = 'interface/audios';
  readonly audios = {
    back: new Audio(this.audioPath + '/back.wav', 0.5),
    validation: new Audio(this.audioPath + '/validation.wav', 0.5),
    cancel: new Audio(this.audioPath + '/back.wav', 0.5),
    click: new Audio(this.audioPath + '/click.wav', 0.2),
    home: new Audio('interface/audios/home.wav', 0.2),
  };
  selectionSubject = new Subject<Entity>();
  loadingSubject = new Subject<boolean>();

  constructor(
    private router: Router,
    private location: Location,
    private modalController: ModalController,
    private audioService: AudioService
  ) {
    this.audioService.load(this.audios, () => {
      this.setLoading(false);
    });
  }

  async openPopup(paragraphs: Paragraph[], choices?: Choice[]) {
    const modal = await this.modalController.create({
      component: InformComponent,
      componentProps: {
        paragraphs,
        choices,
      },
      backdropDismiss: false,
    });
    return await modal.present();
  }

  setSelection(selection: Entity): void {
    if (selection) {
      this.goToSelection(selection.getId());
    }
  }

  setLoading(loading: boolean): void {
    this.loading = loading;
    this.emitLoading();
  }

  emitSelection(): void {
    this.selectionSubject.next(this.selection);
  }

  emitLoading(): void {
    this.loadingSubject.next(this.loading);
  }

  getSelection(): Entity {
    return this.selection;
  }

  onClickButton(type: ButtonType) {
    let audio: Audio;

    switch (type) {
      case ButtonType.Back:
        audio = this.audios.back;
        break;
      case ButtonType.Validation:
        audio = this.audios.validation;
        break;
      case ButtonType.Cancel:
        audio = this.audios.cancel;
        break;
      default:
        audio = this.audios.click;
        break;
    }

    this.audioService.play(audio, AudioLayerKey.Interface);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  goToConfig(): void {
    this.router.navigate(['/config']);
  }

  back(): void {
    this.location.back();
  }

  goToGame(): void {
    this.router.navigate(['/' + INTERFACE_ID]);
  }

  goToPlayer(): void {
    this.router.navigate(['/' + INTERFACE_ID + '/player']);
  }

  goToMessages(): void {
    this.router.navigate(['/' + INTERFACE_ID + '/messages']);
  }

  goToNewPlay(): void {
    this.router.navigate(['/new-play']);
  }

  goToSelection(id: string): void {
    this.router.navigate(['/' + INTERFACE_ID + '/selection/' + id]);
  }

  goToConversation(id: string): void {
    this.router.navigate(['/' + INTERFACE_ID + '/conversation/' + id]);
  }
}
