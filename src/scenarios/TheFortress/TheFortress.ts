import { Gender } from 'src/game/core/dictionnaries/Gender';
import { ConjugationTime } from 'src/game/core/models/Glossary';
import { ParagraphTag } from 'src/game/core/models/Paragraph';
import { Play } from 'src/game/core/models/Play';
import { BaseScenario } from 'src/game/modules/base/models/BaseScenario';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { Place } from 'src/game/modules/base/models/entities/material/Place';
import { Person } from '../../game/core/models/Glossary';
import { AUDIO } from './audios';
import { ENTITY_CONSTRUCTORS } from './entities/entities';
import { IMAGES } from './images';
import { SUBJECTS } from './subjects';

export class TheFortress extends BaseScenario {
  static entityConstructors = ENTITY_CONSTRUCTORS;
  static images = IMAGES;
  static audios = AUDIO;
  static subjects = SUBJECTS;

  starting = {
    maxSpells: 2,
    caracteristicsPoints: 5,
    availableSpells: [
      TheFortress.entityConstructors.DestructionSpell.name,
      TheFortress.entityConstructors.IllusionSpell.name,
      TheFortress.entityConstructors.PrescienceSpell.name,
      TheFortress.entityConstructors.InvocationSpell.name,
      TheFortress.entityConstructors.ProtectionSpell.name,
      TheFortress.entityConstructors.HealingSpell.name,
      TheFortress.entityConstructors.LevitationSpell.name,
      TheFortress.entityConstructors.ControlSpell.name,
    ],
    askForName: false,
  };

  constructor() {
    super('the_fortress', {
      entityConstructors: TheFortress.entityConstructors,
      images: TheFortress.images,
      audios: TheFortress.audios,
      subjects: TheFortress.subjects
    });

    // TODO: move
    this.glossaryConfiguration = {
      conjugationTime: ConjugationTime.Present,
      receiverGender: Gender.Male,
      receiverPerson: Person.SecondPersonPlural,
    };
  }

  getTitle() {
    return 'Le repère';
  }

  init(play: Play) {
    const player = play.addEntity(
      TheFortress.entityConstructors.Elkchten.name
    ) as Character;
    // [
    //   TheFortress.entityConstructors.DestructionSpell.name,
    //   TheFortress.entityConstructors.IllusionSpell.name,
    //   TheFortress.entityConstructors.InvocationSpell.name,
    //   TheFortress.entityConstructors.PrescienceSpell.name,
    //   TheFortress.entityConstructors.ProtectionSpell.name,
    //   TheFortress.entityConstructors.HealingSpell.name,
    //   TheFortress.entityConstructors.LevitationSpell.name,
    //   TheFortress.entityConstructors.ControlSpell.name,
    // ].forEach((item) => {
    //   player.giveSpellOfType(item, false);
    // });
    play.setPlayer(player);
  }

  start(play: Play): void {
    const firstRoom = play.getFirstEntityOfType(
      TheFortress.entityConstructors.MountainousPath.name
    ) as Place;

    (play.getPlayer() as Character).moveTo(firstRoom);

    play.sendMessage([
      {
        tag: ParagraphTag.Event,
        text: "Ici commence l'aventure",
      },
    ]);
  }
}
