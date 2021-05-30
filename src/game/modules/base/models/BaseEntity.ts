import { EntityGetters } from 'src/game/core/models/Entity';
import { Audio } from 'src/game/core/models/Audio';
import { Entity } from 'src/game/core/models/Entity';
import { Image } from 'src/game/core/models/Image';
import { Paragraph, ParagraphTag } from 'src/game/core/models/Paragraph';
import { BasePlay } from '../BasePlay';
import { BaseGlossaryKey } from './BaseGlossary';

export type CaracterticModifier = {
  value: number;
  check?: () => boolean;
};

export type AudioWrapper = {
  audio: Audio;
  check?: () => boolean;
  volume?: number;
};

export type ImageWrapper = { image: Image; check?: () => boolean };

export type BaseEntityGetters = {
  fullDescription?: () => Paragraph[];
  previewDescription?: () => Paragraph[];
  previewImage?: () => Image;
  audioAmbiance?: () => AudioWrapper[];
  fullImages?: () => ImageWrapper[];
  modifiers?: () => { [key: string]: CaracterticModifier };
} & EntityGetters;

export class BaseEntity extends Entity {
  private onGetFullDescription: () => Paragraph[];
  private onGetPreviewDescription: () => Paragraph[];
  private onGetPreviewImage: () => Image;
  private onGetAudioAmbiance: () => AudioWrapper[];
  private onGetFullImages: () => ImageWrapper[];
  private onGetModifiers: () => { [key: string]: CaracterticModifier };

  constructor(play: BasePlay) {
    super(play);
  }

  getPlay(): BasePlay {
    return super.getPlay() as BasePlay;
  }

  makeContent() {
    this.save();
  }

  protected configure(): BaseEntityGetters {
    return {};
  }

  protected setGetters(getters: BaseEntityGetters): void {
    super.setGetters(getters);

    this.onGetFullDescription = getters.fullDescription;
    this.onGetPreviewDescription = getters.previewDescription;
    this.onGetPreviewImage = getters.previewImage;
    this.onGetAudioAmbiance = getters.audioAmbiance;
    this.onGetFullImages = getters.fullImages;
    this.onGetModifiers = getters.modifiers;
  }

  getFullDescription(): Paragraph[] {
    return this.onGetFullDescription
      ? this.onGetFullDescription()
      : [
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
    return this.onGetPreviewDescription ? this.onGetPreviewDescription() : [];
  }

  getPreviewImage(): Image {
    return this.onGetPreviewImage ? this.onGetPreviewImage() : null;
  }

  getAudioAmbiance(): AudioWrapper[] {
    return this.onGetAudioAmbiance ? this.onGetAudioAmbiance() : [];
  }

  getFullImages(): ImageWrapper[] {
    return this.onGetFullImages ? this.onGetFullImages() : [];
  }

  getModifiers(): { [key: string]: CaracterticModifier } {
    return this.onGetModifiers ? this.onGetModifiers() : {};
  }
}
