import { ActionThing } from 'src/game/core/models/Action';
import { BasePlay } from 'src/game/modules/base/BasePlay';
import { BaseAction } from '../BaseAction';
import { Spell } from '../entities/immaterial/Spell';
import { Character } from '../entities/material/Character';

export class CastingOn extends BaseAction {
  constructor(play: BasePlay) {
    super(play, {
      text: () => {
        return 'lancer';
      },
      patterns: [
        {
          checkType: (arg: any) => {
            return arg instanceof Spell;
          },
          getUsableThings: (author) => {
            const things: ActionThing[] = [];

            (author as Character).getSpells().forEach((item) => {
              things.push({
                label: item.getName().printSimple(),
                item,
              });
            });

            return things;
          },
          getSearchText: () => {
            return 'Quel sort voulez-vous lancer&nbsp;?';
          },
          getEmptyText: () => {
            return "Il n'y a aucun sort que vous puissiez lancer.";
          },
        },
      ],
    });
  }

  check(author: Character, args: any[]) {
    let usable = true;

    return {
      usable,
    };
  }

  proceed(author: Character, args: any[]) {
    const spell = args[0] as Spell;
    return spell.castedBy(author);
  }
}
