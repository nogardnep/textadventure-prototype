import { Play } from 'src/game/core/models/Play';
import { BaseScenario } from 'src/game/modules/base/models/BaseScenario';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { Place } from 'src/game/modules/base/models/entities/material/Place';
import { ACTIONS_CONSTRUCTORS } from './dictionnaries/actions';
import { AUDIOS } from './dictionnaries/audios';
import { ENTITY_CONSTRUCTORS } from './dictionnaries/entities';
import { IMAGES } from './dictionnaries/images';

export class TheGarden extends BaseScenario {
  static readonly entityConstructors = ENTITY_CONSTRUCTORS;
  static readonly images = IMAGES;
  static readonly audios = AUDIOS;
  static readonly actions = ACTIONS_CONSTRUCTORS;

  constructor() {
    super('the_garden', {
      starting: {
        maxSpells: 2,
        caracteristicsPoints: 5,
        availableSpells: [],
        askForName: false,
      },
      entityConstructors: TheGarden.entityConstructors,
      images: TheGarden.images,
      audios: TheGarden.audios,
      actions: TheGarden.actions,
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
    return 'Le jardin';
  }

  init(play: Play) {
    const player = play.addEntity(
      TheGarden.entityConstructors.Player.name
    ) as Character;

    play.setPlayer(player);
  }

  start(play: Play) {
    const firstRoom = play.getFirstEntityOfType(
      TheGarden.entityConstructors.Garden.name
    ) as Place;

    (play.getPlayer() as Character).moveTo(firstRoom);
  }

  update(play: Play) {}
}
