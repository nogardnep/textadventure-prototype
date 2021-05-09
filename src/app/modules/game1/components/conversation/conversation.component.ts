import { Entity } from 'src/game/core/models/Entity';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Subject } from 'src/game/modules/base/models/Subject';
import { Character } from 'src/game/modules/base/models/entities/material/Character';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit, OnChanges {
  @Input() entity: Entity;
  subjects = [];

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.update();
  }

  private update() {
    this.subjects = [];

    if (this.entity instanceof Character) {
      this.entity.getConversationSubjects().forEach((item) => {
        if (!item.check || item.check()) {
          this.subjects.push(item);
        }
      });
    }
  }

  onClickSubject(subject: Subject) {
    console.log(subject);
    subject.onAsked();
    this.update();
  }
}
