import { Component, Input } from '@angular/core';
import { Action } from 'src/game/core/models/Action';
import { Paragraph } from 'src/game/core/models/Paragraph';
import { BaseEntity } from 'src/game/modules/base/models/BaseEntity';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
})
export class EntityComponent {
  @Input() entity: BaseEntity;
  @Input() clickable = true;
  @Input() preview = false;
  name: string;
  description: Paragraph[];
  actionsShown = false;

  constructor() {}

  ngOnInit() {
    console.log(this.entity);
  }

  ngOnChanges() {
    this.name = this.entity.getName().printWithIndefiniteArticle();
    this.description = this.preview
      ? this.entity.getPreviewDescription()
      : this.entity.getFullDescription();
  }

  onClick(): void {
    this.actionsShown = !this.actionsShown;
  }
}
