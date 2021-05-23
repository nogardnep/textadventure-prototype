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

@Injectable({
  providedIn: 'root',
})
export class InterfaceService {
  private selection: Entity;
  selectionSubject = new Subject<Entity>();

  constructor(
    private router: Router,
    private location: Location,
    private modalController: ModalController,
    private audioService: AudioService
  ) {}

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
    // this.selection = selection;
    // this.emitSelection();
    if (selection) {
      this.goToSelection(selection.getId());
    }
  }

  emitSelection(): void {
    this.selectionSubject.next(this.selection);
  }

  getSelection(): Entity {
    return this.selection;
  }

  onClickButton() {
    this.audioService.play(
      new Audio('interface/audios/click.wav', 1),
      AudioLayerKey.Interface,
      false
    );
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
}
