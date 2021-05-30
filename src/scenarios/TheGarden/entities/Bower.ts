import { EntityId } from 'src/game/core/models/Entity';
import { Name } from 'src/game/core/models/Name';
import { ParagraphTag } from 'src/game/core/models/Paragraph';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { Place } from 'src/game/modules/base/models/entities/material/Place';
import { TheGarden } from './../TheGarden';
import { Bow } from './Bow';

export class Bower extends Place {
  content = {
    bow: { type: TheGarden.entityConstructors.Bow.name },
    box: {
      type: TheGarden.entityConstructors.Container.name,
      content: {
        bow: { type: TheGarden.entityConstructors.Bow.name },
      },
    },
  };

  getName() {
    return new Name('tonnelle', { feminin: true });
  }

  getFullDescription() {
    console.log(this.getChildren());

    return [
      {
        tag: ParagraphTag.Description,
        text: 'De la verdure.',
      },
      {
        tag: ParagraphTag.Description,
        items: [
          {
            text: 'Un arc',
            entity: this.getContent(this.content.bow),
          },
          {
            text: ' est posé sur une table.',
          },
        ],
        check: () => {
          return this.owns(this.getContent(this.content.bow), false);
        },
      },
    ];
  }

  getChoices() {
    return [
      {
        text: "prendre l'arc",
        proceed: () => {
          (this.getContent(this.content.bow) as Bow).moveTo(
            this.getPlay().getPlayer()
          );
        },
        check: () => {
          return this.owns(this.getContent(this.content.bow), false);
        },
      },
      {
        text: 'aller vers le jardin',
        proceed: () => {
          (this.getPlay().getPlayer() as Character).moveTo(
            this.getPlay().getFirstEntityOfType(
              TheGarden.entityConstructors.Garden.name
            ) as Place
          );
        },
      },
      {
        text: 'écouter...',
        proceed: () => {
          this.getPlay().sendMessage({
            paragraphs: [
              {
                tag: ParagraphTag.Description,
                items: [
                  { text: 'Les  ' },
                  {
                    text: 'oiseaux',
                    entity: this.getPlay().getFirstEntityOfType(
                      TheGarden.entityConstructors.Birds.name
                    ),
                  },
                  { text: ' chantent.' },
                ],
              },
            ],
          });
        },
      },
    ];
  }
}
