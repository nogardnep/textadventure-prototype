import { Entity } from 'src/game/core/models/Entity';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ConversationResponse } from 'src/game/modules/base/models/Conversation';
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
    // this.update();
  }

  // private update() {
  //   this.subjects = [];
  //   const player = this.entity.getPlay().getPlayer() as Character;

  //   if (this.entity instanceof Character) {
  //     this.entity.getConversationResponses().forEach((item) => {
  //       if (!item.check || item.check(player)) {
  //         this.subjects.push(item);
  //       }
  //     });
  //   }
  // }

  // onClickSubject(subject: ConversationResponse) {
  //   const player = this.entity.getPlay().getPlayer() as Character;
  //   subject.onAsked(player);
  //   this.update();
  // }
}
