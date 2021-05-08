import { Component, Input, OnInit } from '@angular/core';
import { Entity } from 'src/game/core/models/Entity';
import { BaseActionKeys } from 'src/game/modules/base/dictionnaries/actions';
import {
  Direction,
  DirectionKey,
} from 'src/game/modules/base/dictionnaries/direction';
import { BaseScenario } from 'src/game/modules/base/models/BaseScenario';
import {
  Connection,
  Place,
} from 'src/game/modules/base/models/entities/material/Place';
import { Passage } from 'src/game/modules/base/models/entities/material/thing/Passage';

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
    const action = this.entity.getPlay().getAction(BaseActionKeys.GoingTo);
    const player = this.entity.getPlay().getPlayer();

    action.use(player, [connection]);
  }

  getDirection(key: DirectionKey): Direction {
    return (this.entity.getPlay().getScenario() as BaseScenario).directions[
      key
    ];
  }

  getPassage(connection: Connection): Passage {
    return this.entity.getPlay().getEntity(connection.passageId) as Passage;
  }

  isUsable(connection: Connection): boolean {
    const passage = connection.passageId ? this.getPassage(connection) : null;

    return !passage || !passage.closed;
  }
}
