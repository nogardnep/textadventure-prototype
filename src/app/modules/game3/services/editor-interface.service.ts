import { Router } from '@angular/router';
import { DescriptorId } from 'src/game/modules/story/main';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditorInterfaceService {
  baseUrl = '/game3/editor';

  constructor(private router: Router) {}

  goToChapter(id: DescriptorId): void {
    this.router.navigate([this.baseUrl + '/chapter', id]);
  }

  goToScene(id: DescriptorId): void {
    this.router.navigate([this.baseUrl + '/scene', id]);
  }

  goToObject(id: DescriptorId): void {
    this.router.navigate([this.baseUrl + '/object', id]);
  }

  goToCharacter(id: DescriptorId): void {
    this.router.navigate([this.baseUrl + '/character', id]);
  }
}
