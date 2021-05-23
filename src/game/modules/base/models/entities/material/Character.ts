import { Gender } from 'src/game/core/dictionnaries/Gender';
import { ActionReport } from 'src/game/core/models/Action';
import { Choice } from 'src/game/core/models/Choice';
import { Entity, EntityId, EntityType } from 'src/game/core/models/Entity';
import { ParagraphItemTag, ParagraphTag } from 'src/game/core/models/Paragraph';
import { Play } from 'src/game/core/models/Play';
import { BaseActionKeys } from '../../../dictionnaries/actions';
import { BASE_SUBJECTS } from '../../../dictionnaries/subjects';
import { ConversationResponse, Subject, SubjectId } from '../../Conversation';
import { Spell } from '../immaterial/Spell';
import { MaterialEntity } from '../MaterialEntity';
import { BaseCaracteristicKey } from './../../../dictionnaries/caracteristics';
import { Thing } from './Thing';
import { HoldableObject } from './thing/object/HoldableObject';
import { WearableObject } from './thing/object/WearableObject';
import { Scenary } from './thing/Scenary';
import { UsuableObject } from './thing/UsuableObject';

export class Character extends MaterialEntity {
  dead = false;
  hands = 2;
  spellsId: EntityId[] = [];
  knownSubjects: SubjectId[] = [];

  constructor(play: Play) {
    super(play);

    for (let key in BASE_SUBJECTS) {
      this.knownSubjects.push(key);
    }

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

  addKnownSubject(subject: Subject) {
    if (!this.knowsSubject(subject)) {
      this.knownSubjects.push(subject.id);
      this.save();
    }
  }

  knowsSubject(subject: Subject): boolean {
    let known = false;

    this.knownSubjects.forEach((item) => {
      if (item === subject.id) {
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
    const choices: Choice[] = [];

    author.knownSubjects.forEach((item) => {
      const response = this.getConversationResponses()[item];

      if (response) {
        choices.push({
          text: this.getPlay().getSubject(item).getTitle(),
          proceed: () => {
            response.onAsked(author);
            this.openConversation(author);
          },
          check: () => {
            return !response.check || response.check(author);
          },
        });
      }
    });

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

  getDialogFor(subject: ConversationResponse) {}

  getConversationResponses(): { [key: string]: ConversationResponse } {
    return {};
  }

  getGender(): Gender {
    return Gender.Male;
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

  canSee(entity: MaterialEntity): boolean {
    let response = false;

    if (!entity.invisible) {
      if (entity instanceof Scenary) {
        response = true;
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

  attackedBy(target: Character): ActionReport {
    // TODO
    return { success: false };
  }

  private checkVisible(entity: MaterialEntity): boolean {
    let response = false;

    if (!(entity as Thing).closed || (entity as Thing).transparent) {
      const parent = entity.getParent();

      if (parent && parent.equals(this.getParent())) {
        response = true;
      } else {
        response = this.checkVisible(parent);
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
      !(entity as Thing).closed &&
      (entity.getParent().equals(this) ||
        !(entity instanceof Character) ||
        (entity as Character).dead)
    ) {
      const parent = entity.getParent();

      if (parent && parent.equals(this.getParent())) {
        response = true;
      } else {
        response = this.checkReachable(parent);
      }
    }

    return response;
  }
}
