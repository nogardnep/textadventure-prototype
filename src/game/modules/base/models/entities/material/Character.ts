import { Gender } from 'src/game/core/dictionnaries/Gender';
import { ActionReport } from 'src/game/core/models/Action';
import { Choice } from 'src/game/core/models/Choice';
import { Entity, EntityId, EntityType } from 'src/game/core/models/Entity';
import { ParagraphItemTag, ParagraphTag } from 'src/game/core/models/Paragraph';
import { BaseActionKeys } from '../../../dictionnaries/actions';
import { ConversationResponse } from '../../Conversation';
import { Spell } from '../immaterial/Spell';
import { MaterialEntity } from '../MaterialEntity';
import { BasePlay } from './../../../BasePlay';
import { BaseCaracteristicKey } from './../../../dictionnaries/caracteristics';
import { Place } from './Place';
import { Thing } from './Thing';
import { HoldableObject } from './thing/object/HoldableObject';
import { WearableObject } from './thing/object/WearableObject';
import { Passage } from './thing/Passage';
import { Scenary } from './thing/Scenary';
import { UsuableObject } from './thing/UsuableObject';

export class Character extends MaterialEntity {
  private dead = false;
  private hands = 2;
  private spellsId: EntityId[] = [];
  private knownEntities: EntityType[] = [];
  private gender: Gender = Gender.Male;

  constructor(play: BasePlay) {
    super(play);

    for (let key in BaseCaracteristicKey) {
      this.setCaracteristic(BaseCaracteristicKey[key], {
        current: 10,
        max: 10,
        min: 0,
      });
    }
  }

  useAction(key: string, args: any[]): boolean {
    return this.getPlay().getAction(key).use(this, args);
  }

  die(): void {
    this.dead = true;
    this.save();
  }

  getHands(): number {
    return this.hands;
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
    this.getPlay().sendMessage({
      paragraphs: [
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
      ],
    });
  }

  talkedBy(author: Character) {
    author.addKnownEntity(this.getType());
    this.getPlay().startConversation(this);

    return {
      success: true,
    };
  }

  openConversation(author: Character): void {
    const choices: Choice[] = [];

    for (let key in this.getConversationResponses(author)) {
      if (author.knowsEntity(key)) {
        const response = this.getConversationResponses(author)[key];

        if (response) {
          let text: string;

          if (response.getSubjectTitle) {
            text = response.getSubjectTitle();
          } else if (this.isOfType(key)) {
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
              this.getPlay();
              this.getPlay().sendMessage({ paragraphs: response.paragraphs });

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

    this.getPlay().sendMessage({
      paragraphs: [
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
      choices,
    });
  }

  getDisplayedActions() {
    return super
      .getDisplayedActions()
      .concat([BaseActionKeys.Attacking, BaseActionKeys.Talking]);
  }

  getConversationResponses(asker: Character): {
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
    return (
      entity instanceof HoldableObject &&
      this.owns(entity, false) &&
      entity.isHeld()
    );
  }

  isWearing(entity: Entity): boolean {
    return (
      entity instanceof WearableObject &&
      this.owns(entity, false) &&
      entity.isWorn()
    );
  }

  isDead(): boolean {
    return this.dead;
  }

  getWornObject(emplacementKey: string): UsuableObject {
    let found: UsuableObject = null;

    this.getChildren().forEach((entity: MaterialEntity) => {
      if (
        entity instanceof WearableObject &&
        entity.isWorn() &&
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

  getSpellsOfType(type: EntityType): Entity[] {
    return this.getChildrenOfType(type, this.spellsId);
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

    if (!entity.isInvisible()) {
      if (entity instanceof Scenary) {
        response = true;
      } else if (entity.owns(this, false)) {
        response = true;
      } else if (entity instanceof Passage) {
        response = (this.getParent() as Place).hasPassage(entity);
      } else {
        const parent = entity.getParent();

        if (parent) {
          if (parent.equals(this.getParent())) {
            response = true;
          } else {
            response = this.checkVisible(entity, parent);
          }
        }
      }
    }

    return response;
  }

  private checkVisible(
    entity: MaterialEntity,
    parent: MaterialEntity
  ): boolean {
    let response = false;

    if (
      (!(parent instanceof Thing) ||
        !parent.isClosed() ||
        parent.isTransparent()) &&
      (!(parent instanceof Character) ||
        parent.isWearing(entity) ||
        parent.isHolding(entity) ||
        parent.isDead() ||
        parent.isThePlayer())
    ) {
      if (parent instanceof Passage) {
        response = true;
      } else {
        const grandParent = parent.getParent();
        if (grandParent) {
          if (grandParent && grandParent.equals(this.getParent())) {
            response = true;
          } else {
            response = this.checkVisible(entity, grandParent);
          }
        }
      }
    }

    return response;
  }

  canReach(entity: MaterialEntity): boolean {
    let response = false;

    if (!(entity as MaterialEntity).isInvisible()) {
      if (entity instanceof Passage) {
        const location = this.getParent();
        if (location instanceof Place) {
          response = location.hasPassage(entity);
        }
      } else {
        const parent = entity.getParent();

        if (parent) {
          if (parent.equals(this.getParent())) {
            response = true;
          } else {
            response = this.checkReachable(entity, parent);
          }
        }
      }
    }

    return response;
  }

  private checkReachable(
    entity: MaterialEntity,
    parent: MaterialEntity
  ): boolean {
    let response = false;

    if (parent instanceof Passage) {
      const location = this.getParent();
      if (location instanceof Place) {
        response = location.hasPassage(parent);
      }
    } else if (
      (parent instanceof Thing && !parent.isClosed()) ||
      (parent.getParent() && parent.getParent().equals(this)) ||
      (parent instanceof Character && parent.dead)
    ) {
      const grandParent = parent.getParent();

      if (grandParent) {
        if (grandParent.equals(this.getParent())) {
          response = true;
        } else {
          response = this.checkReachable(entity, grandParent);
        }
      }
    }

    return response;
  }
}
