import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BaseEntity } from 'src/game/modules/base/models/entities/BaseEntity';
import { Place } from 'src/game/modules/base/models/entities/material/Place';

@Component({
  selector: 'app-entity-full',
  templateUrl: './entity-full.component.html',
  styleUrls: ['./entity-full.component.scss'],
})
export class EntityFullComponent implements OnInit, OnDestroy {
  @Input() entity: BaseEntity;
  hasConnections: boolean;
  entityAsPlace: Place;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.hasConnections =
      this.entity instanceof Place && this.entity.getConnections().length > 0;
    this.entityAsPlace = this.entity as Place;
  }

  ngOnDestroy() {}
}
