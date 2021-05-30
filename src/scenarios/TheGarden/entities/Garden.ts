import { Name } from 'src/game/core/models/Name';
import { ParagraphTag } from 'src/game/core/models/Paragraph';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { Place } from 'src/game/modules/base/models/entities/material/Place';
import { TheGarden } from '../TheGarden';

export class Garden extends Place {
  configure() {
    return {
      name: () => {
        return new Name('jardin');
      },
      choices: () => {
        return [
          {
            text: 'entrer sous la tonnelle',
            proceed: () => {
              (this.getPlay().getPlayer() as Character).moveTo(
                this.getPlay().getFirstEntityOfType(
                  TheGarden.entityConstructors.Bower.name
                ) as Place
              );
            },
          },
        ];
      },
    };
  }

  getFullDescription() {
    return [
      {
        tag: ParagraphTag.Description,
        text: 'De la verdure.',
      },
      {
        tag: ParagraphTag.Description,
        items: [
          { text: 'Des ' },
          {
            text: 'oiseaux',
            entity: this.getPlay().getFirstEntityOfType(
              TheGarden.entityConstructors.Birds.name
            ),
          },
          { text: '.' },
        ],
      },
    ];
  }
}
