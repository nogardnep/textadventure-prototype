import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Choice } from 'src/game/core/models/Choice';
import { Entity } from 'src/game/core/models/Entity';
import { BaseEntity } from 'src/game/modules/base/models/BaseEntity';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrls: ['./choices.component.scss'],
})
export class ChoicesComponent implements OnInit, OnChanges {
  @Input() entity: BaseEntity;
  @Input() clickable: boolean = true;
  choices = [];

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.choices = [];

    this.entity.getChoices().forEach((choice) => {
      if (this.isVisible(choice)) {
        this.choices.push(choice);
      }
    });
  }

  onClickChoice(choice: Choice): void {
    // if (this.clickable) {
    if (this.isUsable()) {
      this.entity.getPlay().useChoice(choice);
    }
  }

  private isUsable(): boolean {
    return (
      !(this.entity instanceof MaterialEntity) ||
      this.entity.getPlay().getPlayer().canSee(this.entity)
    );
  }

  private isVisible(choice: Choice): boolean {
    return !choice.check || choice.check();
  }
}
