import { Gender } from 'src/game/core/dictionnaries/Gender';
import { ConjugationTime } from 'src/game/core/models/Glossary';
import { Play } from 'src/game/core/models/Play';
import { DirectionKeys } from 'src/game/modules/base/dictionnaries/direction';
import { BaseScenario } from 'src/game/modules/base/models/BaseScenario';
import { Character } from 'src/game/modules/base/models/entities/material/Character';
import { Place } from 'src/game/modules/base/models/entities/material/Place';
import { Person } from '../../game/core/models/Glossary';
import { ENTITY_CONSTRUCTORS } from './entities/entities';

export class TheFortress extends BaseScenario {
  static entityConstructors = ENTITY_CONSTRUCTORS;

  constructor() {
    super();

    this.id = 'the_fortress';
    this.title = { fr: 'Le repère' };
    this.entityConstructors = Object.assign(
      {},
      this.entityConstructors,
      TheFortress.entityConstructors
    );
    this.glossaryConfiguration = {
      conjugationTime: ConjugationTime.Present,
      receiverGender: Gender.Male,
      receiverPerson: Person.SecondPersonPlural,
    };
  }

  init(play: Play) {
    const player = play.addEntity(
      TheFortress.entityConstructors.Player.name
    ) as Character;

    const firstRoom = play.getFirstEntityOfType(
      TheFortress.entityConstructors.MountainousPath.name
    ) as Place;

    player.moveTo(firstRoom);

    play.setPlayer(player);
  }

  start(play: Play): void {
  }

  update(play: Play): void {}
}
