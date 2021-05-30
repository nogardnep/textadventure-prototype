import { Action, ActionReport, ActionThing } from 'src/game/core/models/Action';
import { Entity } from 'src/game/core/models/Entity';
import { BasePlay } from 'src/game/modules/base/BasePlay';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { MaterialEntity } from 'src/game/modules/base/models/entities/MaterialEntity';
import { ShootableObject } from '../entities/material/thing/object/ShootableObject';

export class Shooting extends Action {
  constructor(play: BasePlay) {
    super(play, {
      text: () => {
        return 'tirer';
      },
      patterns: [
        {
          checkType: (arg: any) => {
            return arg instanceof MaterialEntity;
          },
          getUsableThings: (author: Entity) => {
            const found = [];

            return found;
          },
          getSearchText: () => {
            return 'Sur quoi voulez-vous tirer&nbsp;?';
          },
          getEmptyText: () => {
            return "Il n'y a rien sur quoi vous puissiez tirer.";
          },
        },
        {
          checkType: (arg: any) => {
            return arg instanceof ShootableObject;
          },
          getUsableThings: (author: Entity) => {
            const things: ActionThing[] = [];

            (author as Character).getChildren().forEach((item) => {
              if (item instanceof ShootableObject) {
                things.push({
                  label: item.getName().printWithDefiniteArticle(),
                  item,
                });
              }
            });

            return things;
          },
          getSearchText: () => {
            return 'Avec quoi voulez-vous tirer&nbsp;?';
          },
          getEmptyText: () => {
            return "Vous n'avez rien avec quoi tirer.";
          },
        },
      ],
    });
  }

  check(author: Entity, args: any[], silently: boolean) {
    return {
      usable: true,
      failureMessage: null,
    };
  }

  protected proceed(author: Entity, args: any[]): ActionReport {
    return (args[0] as MaterialEntity).shootedBy(
      author as Character,
      args[1] as ShootableObject
    );
  }
}
