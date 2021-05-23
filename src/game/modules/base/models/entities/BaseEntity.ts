import { Audio } from 'src/game/core/models/Audio';
import { Entity } from 'src/game/core/models/Entity';
import { Image } from 'src/game/core/models/Image';
import { Paragraph, ParagraphTag } from 'src/game/core/models/Paragraph';
import { BaseGlossaryKey } from '../BaseGlossary';

export type CaracterticModifier = {
  value: number;
  check?: () => boolean;
};

export class BaseEntity extends Entity {
  getExteriorDescription(): Paragraph[] {
    return [
      {
        tag: ParagraphTag.Description,
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
        tag: ParagraphTag.Description,
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

  getModifiers(): { [key: string]: CaracterticModifier } {
    return {};
  }
}
