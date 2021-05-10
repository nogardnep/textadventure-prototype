import { InvocationSpell } from './spells/InvocationSpell';
import { ControlSpell } from './spells/ControlSpell';
import { ProtectionSpell } from './spells/ProtectionSpell';
import { PrescienceSpell } from './spells/PrescienceSpell';
import { LevitationSpell } from './spells/LevitationSpell';
import { HealingSpell } from './spells/HealingSpell';
import { IllusionSpell } from './spells/IllustionSpell';
import { DestructionSpell } from './spells/DestructionSpell';
import { Player } from './characters/Player';
import { Giant } from './characters/Giant';
import { SecreteEntry } from './places/SecreteEntry';
import { Plateau } from './places/Plateau';
import { MountainousPath } from './places/MountainousPath';
import { GreatEntry } from './places/GreatEntry';
import { Crevasse } from './places/Crevasse';
import { Bridge } from './places/Bridge';

export const ENTITY_CONSTRUCTORS = {
  Bridge,
  Crevasse,
  GreatEntry,
  MountainousPath,
  Plateau,
  SecreteEntry,
  Giant,
  Player,
  DestructionSpell,
  IllusionSpell,
  InvocationSpell,
  HealingSpell,
  LevitationSpell,
  PrescienceSpell,
  ProtectionSpell,
  ControlSpell,
};
