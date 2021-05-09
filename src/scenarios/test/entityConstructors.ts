import { Door } from './models/passages/ChambreDoor';
import { Shield } from './models/objects/Shield';
import { Sword } from './models/objects/Sword';
import { Tom } from './models/characters/Tom';
import { Box } from './models/objects/Box';
import { InvocationSpell } from './models/spells/InvocationSpell';
import { IllusionSpell } from './models/spells/IllustionSpell';
import { PoisonEffect } from './models/effects/PoisonEffect';
import { DestructionSpell } from './models/spells/DestructionSpell';
import { Boots } from './models/objects/Boots';
import { Helmet } from './models/objects/Helmet';
import { Jean } from './models/characters/Jean';
import { Corridor } from './models/places/Corridor';
import { Chamber } from './models/places/Chamber';

export const ENTITY_CONSTRUCTORS = {
  Chamber,
  Corridor,
  Jean,
  Helmet,
  Boots,
  DestructionSpell,
  PoisonEffect,
  IllusionSpell,
  InvocationSpell,
  Box,
  Tom,
  Sword,
  Shield,
  Door,
};
