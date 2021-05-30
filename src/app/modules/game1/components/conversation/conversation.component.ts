import { ConversationResponse } from 'src/game/modules/base/models/Conversation';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Choice } from 'src/game/core/models/Choice';
import { Entity } from 'src/game/core/models/Entity';
import { Paragraph } from 'src/game/core/models/Paragraph';
import { Character } from 'src/game/modules/base/models/entities/material/Character';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit, OnChanges {
  @Input() entity: Character;
  choices: Choice[];
  speeches: Paragraph[][] = [];
  responses: {
    [key: string]: ConversationResponse;
  } = {};

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.speeches = [];
    this.update();
  }

  private update() {
    this.choices = [];
    const player = this.entity.getPlay().getPlayer() as Character;
    this.responses = this.entity.getConversationResponses(player);

    for (let key in this.responses) {
      if (player.knowsEntity(key)) {
        const response = this.responses[key];

        if (response) {
          let text: string;

          if (response.getSubjectTitle) {
            text = response.getSubjectTitle();
          } else if (this.entity.isOfType(key)) {
            text = this.entity.getName().getObjectComplement();
          } else {
            text = this.entity
              .getPlay()
              .getFirstEntityOfType(key)
              .getName()
              .printWithDefiniteArticle();
          }

          this.choices.push({
            text,
            proceed: () => {
              this.ask(key);
            },
            check: () => {
              return !response.check || response.check(player);
            },
          });
        }
      }
    }
  }

  private ask(subject: string) {
    const player = this.entity.getPlay().getPlayer() as Character;
    const response = this.responses[subject];

    if (response) {
      this.speeches.push(response.paragraphs);
      if (response.onAsked) {
        response.onAsked(player);
      }
    } else {
      console.error('No response found for "' + subject + '"');
    }
  }

  onClickChoice(choices: Choice) {
    choices.proceed();
    this.update();
  }

  onItemClicked(entity: Entity): void {
    this.ask(entity.getType());
  }
}
