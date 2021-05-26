import { InterfaceService } from 'src/app/services/interface.service';
import { Entity } from 'src/game/core/models/Entity';
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

  constructor(private interfaceService: InterfaceService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.hasConnections =
      this.entity instanceof Place && this.entity.getConnections().length > 0;
    this.entityAsPlace = this.entity as Place;
  }

  ngOnDestroy() {}

  onItemClicked(item: Entity) {
    this.interfaceService.setSelection(item);
  }
}
