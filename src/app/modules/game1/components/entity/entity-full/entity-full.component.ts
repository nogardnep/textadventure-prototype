import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AudioChannelKey, AudioService } from 'src/app/services/audio.service';
import { Paragraph } from 'src/game/core/models/Paragraph';
import { BaseEntity } from 'src/game/modules/base/models/entities/BaseEntity';

@Component({
  selector: 'app-entity-full',
  templateUrl: './entity-full.component.html',
  styleUrls: ['./entity-full.component.scss'],
})
export class EntityFullComponent implements OnInit, OnDestroy {
  @Input() entity: BaseEntity;
  @Input() description: Paragraph[];

  constructor(private audioService: AudioService) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
