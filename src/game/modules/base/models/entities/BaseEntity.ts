import { Audio } from 'src/game/core/models/Audio';
import { Entity } from 'src/game/core/models/Entity';
import { Image } from 'src/game/core/models/Image';
import { Paragraph } from 'src/game/core/models/Paragraph';
import { BaseGlossaryKey } from '../BaseGlossary';

export class BaseEntity extends Entity {
  getExteriorDescription(): Paragraph[] {
    return [
      {
        text: this.getPlay().getPhrase(
          BaseGlossaryKey.NothingToSayAboutEntity,
          [this]
        ),
      },
    ];
  }

  getInteriorDescription(): Paragraph[] {
    return [
      {
        text: this.getPlay().getPhrase(
          BaseGlossaryKey.NothingToSayAboutEntity,
          [this]
        ),
      },
    ];
  }

  getPreviewDescription(): Paragraph[] {
    return [];
  }

  getPreviewImage(): Image {
    return null;
  }

  getAudioAmbiance(): { audio: Audio; check?: () => boolean }[] {
    return [];
  }

  getFullImages(): { image: Image; check?: () => boolean }[] {
    return [];
  }
}
