import { ParagraphTag } from 'src/game/core/models/Paragraph';
import { EndMode, Play } from 'src/game/core/models/Play';
import { BaseCaracteristicKey } from 'src/game/modules/base/dictionnaries/caracteristics';
import { BaseScenario } from 'src/game/modules/base/models/BaseScenario';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { Place } from 'src/game/modules/base/models/entities/material/Place';
import { AUDIO } from './dictionnaries/audios';
import { ENTITY_CONSTRUCTORS } from './dictionnaries/entities';
import { IMAGES } from './dictionnaries/images';
import { SUBJECTS } from './dictionnaries/subjects';

export class TheFortress extends BaseScenario {
  static readonly entityConstructors = ENTITY_CONSTRUCTORS;
  static readonly images = IMAGES;
  static readonly audios = AUDIO;
  static readonly subjects = SUBJECTS;

  constructor() {
    super('the_fortress', {
      starting: {
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
      },
      entityConstructors: TheFortress.entityConstructors,
      images: TheFortress.images,
      audios: TheFortress.audios,
      subjects: TheFortress.subjects,
    });

    // TODO: move
    // this.glossaryConfiguration = {
    //   conjugationTime: ConjugationTime.Present,
    //   receiverGender: Gender.Male,
    //   receiverPerson: Person.SecondPersonPlural,
    // };

    this.setStartDate(new Date(800, 5, 5, 6, 23));
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
    // }); // TODO: temp
    play.setPlayer(player);
  }

  start(play: Play) {
    const firstRoom = play.getFirstEntityOfType(
      TheFortress.entityConstructors.MountainousPath.name
    ) as Place;

    (play.getPlayer() as Character).moveTo(firstRoom);

    play.sendMessage({
      paragraphs: [
        {
          tag: ParagraphTag.Event,
          text: "Ici commence l'aventure",
        },
      ],
      onRead: () => {
        play.playMusic(TheFortress.audios.music);
      },
    });
  }

  update(play: Play) {
    const player = play.getPlayer() as Character;
    if (player.getEffectiveCaracteristicValue(BaseCaracteristicKey.Life) <= 0) {
      play.end(EndMode.Defeat, [
        { tag: ParagraphTag.Event, text: 'Les forces vous manquent...' },
      ]);
    }

    for (let i = 0; i <= 100; i++) {
      (play.getPlayer() as Character).testCaracteristic(
        BaseCaracteristicKey.Resistance,
        0
      );
    }
  }
}
