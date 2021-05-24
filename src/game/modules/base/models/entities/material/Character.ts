import { Gender } from 'src/game/core/dictionnaries/Gender';
import { ActionReport } from 'src/game/core/models/Action';
import { Choice } from 'src/game/core/models/Choice';
import { Entity, EntityId, EntityType } from 'src/game/core/models/Entity';
import { ParagraphItemTag, ParagraphTag } from 'src/game/core/models/Paragraph';
import { Play } from 'src/game/core/models/Play';
import { BaseActionKeys } from '../../../dictionnaries/actions';
import { ConversationResponse } from '../../Conversation';
import { Spell } from '../immaterial/Spell';
import { MaterialEntity } from '../MaterialEntity';
import { BaseCaracteristicKey } from './../../../dictionnaries/caracteristics';
import { Place } from './Place';
import { Thing } from './Thing';
import { HoldableObject } from './thing/object/HoldableObject';
import { WearableObject } from './thing/object/WearableObject';
import { Passage } from './thing/Passage';
import { Scenary } from './thing/Scenary';
import { UsuableObject } from './thing/UsuableObject';

export class Character extends MaterialEntity {
  dead = false;
  hands = 2;
  spellsId: EntityId[] = [];
  knownEntities: EntityType[] = [];
  gender: Gender = Gender.Male;

  constructor(play: Play) {
    super(play);

    for (let key in BaseCaracteristicKey) {
      this.caracteristics[BaseCaracteristicKey[key]] = {
        current: 10,
        max: 10,
        min: 0,
      };
    }
  }

  kill() {
    this.dead = true;
    this.save();
  }

  addKnownEntity(type: EntityType) {
    if (!this.knowsEntity(type)) {
      this.knownEntities.push(type);
      this.save();
    }
  }

  knowsEntity(type: EntityType): boolean {
    let known = false;

    this.knownEntities.forEach((item) => {
      if (item === type) {
        known = true;
      }
    });

    return known;
  }

  say(text: string) {
    this.getPlay().sendMessage([
      {
        items: [
          {
            text: this.getName().printWithDefiniteArticle(true) + '&nbsp;- ',
            tag: ParagraphItemTag.Speacher,
          },
          { text: text },
        ],
        tag: ParagraphTag.Speech,
      },
    ]);
  }

  talkedBy(author: Character) {
    this.openConversation(author);

    return {
      success: true,
    };
  }

  openConversation(author: Character): void {
    author.addKnownEntity(this.getType());

    const choices: Choice[] = [];

    for (let key in this.getConversationResponses(author)) {
      if (author.knowsEntity(key)) {
        const response = this.getConversationResponses(author)[key];

        if (response) {
          let text: string;

          if (response.getSubjectTitle) {
            text = response.getSubjectTitle();
          }else if (this.isOfType(key)) {
            text = this.getName().getObjectComplement();
          } else {
            text = this.getPlay()
              .getFirstEntityOfType(key)
              .getName()
              .printWithDefiniteArticle();
          }

          choices.push({
            text,
            proceed: () => {
              this.say(response.text);
              if (response.onAsked) {
                response.onAsked(author);
              }
              this.openConversation(author);
            },
            check: () => {
              return !response.check || response.check(author);
            },
          });
        }
      }
    }

    this.getPlay().sendMessage(
      [
        {
          tag: ParagraphTag.Information,
          text:
            'Interroger ' +
            this.getName().printWithDefiniteArticle() +
            ' sur&nbsp;:',
          check: () => {
            return choices.length > 0;
          },
        },
        {
          tag: ParagraphTag.Information,
          text:
            this.getName().printWithDefiniteArticle(true) +
            " n'a rien à vous dire.",
          check: () => {
            return choices.length === 0;
          },
        },
      ],
      choices
    );
  }

  getDisplayedActionKeys() {
    return super
      .getDisplayedActionKeys()
      .concat([BaseActionKeys.Attacking, BaseActionKeys.Talking]);
  }

  getConversationResponses(author: Character): {
    [key: string]: ConversationResponse;
  } {
    return {};
  }

  getGender(): Gender {
    return this.gender;
  }

  getHeldObjects(): HoldableObject[] {
    let found: HoldableObject[] = [];

    this.getChildren().forEach((item: Entity) => {
      if (this.isHolding(item)) {
        found.push(item as HoldableObject);
      }
    });

    return found;
  }

  getWornObjects(): WearableObject[] {
    let found: WearableObject[] = [];

    this.getChildren().forEach((item: Entity) => {
      if (this.isWearing(item)) {
        found.push(item as WearableObject);
      }
    });

    return found;
  }

  getInventoryObjects(): UsuableObject[] {
    let found: UsuableObject[] = [];

    this.getChildren().forEach((item: Entity) => {
      if (!this.isWearing(item) && !this.isHolding(item)) {
        found.push(item as UsuableObject);
      }
    });

    return found;
  }

  isHolding(entity: Entity): boolean {
    return (entity as HoldableObject).held;
  }

  isWearing(entity: Entity): boolean {
    return (entity as WearableObject).worn;
  }

  getWornObject(emplacementKey: string): UsuableObject {
    let found: UsuableObject = null;

    this.getChildren().forEach((entity: MaterialEntity) => {
      if (
        entity instanceof WearableObject &&
        entity.worn &&
        entity.getEmplacement() === emplacementKey
      ) {
        found = entity;
      }
    });

    return found;
  }

  getSpells(): Spell[] {
    const entities: Spell[] = [];

    this.spellsId.forEach((id: EntityId) => {
      const entity = this.getPlay().getEntity(id);
      entities.push(entity as Spell);
    });

    return entities;
  }

  giveEffect(entity: Entity): void {
    this.addToList(entity, this.effectsId);
  }

  giveSpell(entity: Entity): void {
    this.addToList(entity, this.spellsId);
  }

  giveSpellOfType(type: EntityType, doNotCreateNew: boolean): Spell {
    return this.giveEntityOfTypeInList(
      type,
      this.spellsId,
      doNotCreateNew
    ) as Spell;
  }

  getEffectsOfType(type: EntityType): Entity[] {
    return this.getChildrenOfType(type, this.effectsId);
  }

  getSpellsOfType(type: EntityType): Entity[] {
    return this.getChildrenOfType(type, this.spellsId);
  }

  takeOffEffect(entity: Spell): void {
    this.removeFromList(entity, this.effectsId);
  }

  takeOffSpell(entity: Spell): void {
    this.removeFromList(entity, this.spellsId);
  }

  getSpellOfType(type: string): Spell {
    let spell: Spell = null;

    this.spellsId.forEach((id: EntityId) => {
      const item = this.getPlay().getEntity(id);

      if (item.inheritsFrom(type)) {
        spell = item as Spell;
      }
    });

    return spell;
  }

  attackedBy(target: Character): ActionReport {
    // TODO
    return { success: false };
  }

  canSee(entity: MaterialEntity): boolean {
    let response = false;

    if (!entity.invisible) {
      if (entity instanceof Scenary) {
        response = true;
      } else if (entity instanceof Passage) {
        (this.getParent() as Place).getConnections().forEach((item) => {
          if (item.passageId === entity.getId()) {
            response = true;
          }
        });
      } else {
        const parent = entity.getParent();

        if (parent) {
          if (parent.equals(this.getParent())) {
            response = true;
          } else {
            response = this.checkVisible(parent);
          }
        }
      }
    }

    return response;
  }

  private checkVisible(entity: MaterialEntity): boolean {
    let response = false;

    if (!(entity instanceof Thing) || !entity.closed || entity.transparent) {
      if (entity instanceof Passage) {
        response = true;
      } else {
        // const parent = entity.getParent();
        // if (parent) {
        //   if (parent && parent.equals(this.getParent())) {
        //     response = true;
        //   } else {
        //     response = this.checkVisible(parent);
        //   }
        // }
      }
    }

    return response;
  }

  canReach(entity: MaterialEntity): boolean {
    let response = false;

    if (!(entity as MaterialEntity).invisible) {
      const parent = entity.getParent();

      if (parent) {
        if (parent.equals(this.getParent())) {
          response = true;
        } else {
          response = this.checkReachable(parent);
        }
      }
    }

    return response;
  }

  private checkReachable(entity: MaterialEntity): boolean {
    let response = false;

    if (
      (entity instanceof Thing && !entity.closed) ||
      (entity.getParent() && entity.getParent().equals(this)) ||
      !(entity instanceof Character) ||
      entity.dead
    ) {
      const parent = entity.getParent();

      if (parent) {
        if (parent.equals(this.getParent())) {
          response = true;
        } else {
          response = this.checkReachable(parent);
        }
      }
    }

    return response;
  }
}
