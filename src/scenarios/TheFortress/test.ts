import { Entity } from './../../game/core/models/Entity';
import { Sword } from './entities/objects/Sword';
import { DirectionKeys } from './../../game/modules/base/dictionnaries/direction';
import { TheFortress } from './TheFortress';
import { EntityType } from 'src/game/core/models/Entity';
import { DirectionKey } from 'src/game/modules/base/dictionnaries/direction';
import { Play } from 'src/game/core/models/Play';
import { Place } from 'src/game/modules/base/models/entities/material/Place';

// TODO: delete

type EntityDescription = {
  type: EntityType;
  name: {
    core: string;
  };
  initState?: InitState;
};

type InitState = {
  children?: {
    type: EntityType;
    initState?: InitState;
  }[];
  properties?: [
    {
      key: string;
      value: any;
    }
  ];
};

type PlaceDescription = EntityDescription & {
  connections: [
    {
      directionKey: DirectionKey;
      destination: EntityType;
      distance: number;
      passage: EntityType;
    }
  ];
};

const entityTypes = {
  Place,
};

type EntityDescParams = {
  name: { core: string };
  update?: () => void;
  init?: () => void;
};

class EntityDesc {
  params: {};
  type: EntityType;

  constructor(type: EntityType, params: EntityDescParams) {
    this.params = params;
    this.type = type;
  }

  create(play: Play): Entity {
    return new entityTypes[this.type](play);
  }
}

type PlaceDescParams = EntityDescParams & {
  connections: {
    directionKey: DirectionKey;
    destination: EntityType;
    distance: number;
    passage: EntityType;
  }[];
};

class PlaceDesc extends EntityDesc {
  constructor(params: PlaceDescParams) {
    super(entityTypes.Place.name, params);
  }
}

const sword: EntityDescription = {
  type: 'Sword',
  name: { core: 'sword' },
};

const chest: EntityDescription = {
  type: 'Sword',
  name: { core: 'chest' },
};

const types = {
  Plateau: 'Plateau',
  Sword: 'Sword',
  Chest: 'Chest',
};

// const plateau: PlaceDescription = {
//   type: TheFortress.entityConstructors.Plateau.name,
//   name: {
//     core: 'plateau',
//   },
//   children: [
//     {
//       type: TheFortress.entityConstructors.Chest.name,
//       children: [{ type: TheFortress.entityConstructors.Sword.name }],
//     },
//   ],
//   connections: [
//     {
//       directionKey: DirectionKeys.East,
//       destination: TheFortress.entityConstructors.Crevasse.name,
//       distance: 10,
//       passage: TheFortress.entityConstructors.Bridge.name,
//     },
//   ],
// };

// const entitiesTypes = {
//   [types.Plateau]: plateau,
//   [types.Sword]: sword,
//   [types.Chest]: chest,
// };

const entities = {
  plateau: new PlaceDesc({
    name: { core: 'plateau' },
    connections: [],
  }),
  // plateau: new PlaceDesc({
  //   name: { core: 'plateau' },
  //   connections: [],
  // }),
};
