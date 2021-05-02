import { Action } from 'src/game/models/Action';
import { Entity } from '../Entity';

export abstract class Spell extends Entity {
  getActions(additionnal?: Action[]) {
    let actions: Action[] = [
      {
        text: { fr: 'lancer', en: 'cast' },
        proceed: () => {
          this.cast();
        },
      },
    ];

    if (additionnal) {
      actions = actions.concat(additionnal);
    }

    return actions;
  }

  cast(): void {
    let response = null;
    const location: Entity = this.getPlay().getPlayer().getParent();

    if (location.getResponseToSpell) {
      response = location.getResponseToSpell(this.constructor.name);
    }

    if (response) {
      response();
    } else {
      this.getPlay().inform([{ text: { fr: 'rien ne se passe' } }]);
    }
  }
}
