import {
  Direction,
  DirectionKey,
} from './../../../../game/dictionnaries/Direction';
import { Entity } from 'src/game/models/Entity';
import { Component, Input, OnInit } from '@angular/core';
import { Connection, Place } from 'src/game/models/entities/material/Place';
import { Passage } from 'src/game/models/entities/material/thing/Passage';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss'],
})
export class ConnectionsComponent implements OnInit {
  @Input() entity: Entity;
  connections: Connection[] = [];

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.connections = (this.entity as Place).getConnections();
  }

  isVisible(connection: Connection): boolean {
    return !connection.check || connection.check();
  }

  onClickConnection(connection: Connection): void {
    this.entity.getPlay().useConnection(connection);
    // TODO
  }

  getDirection(key: DirectionKey): Direction {
    return this.entity.getPlay().getDirection(key);
  }

  getPassage(connection: Connection): Passage {
    return this.entity.getPlay().getEntity(connection.passageId) as Passage;
  }

  isUsable(connection: Connection): boolean {
    const passage = connection.passageId ? this.getPassage(connection) : null;

    return !passage || !passage.closed;
  }
}
