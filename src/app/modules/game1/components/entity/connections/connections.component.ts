import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { BaseActionKeys } from 'src/game/modules/base/dictionnaries/actions';
import {
  Direction,
  DirectionKey,
} from 'src/game/modules/base/dictionnaries/direction';
import { BaseEntity } from 'src/game/modules/base/models/BaseEntity';
import { BaseScenario } from 'src/game/modules/base/models/BaseScenario';
import {
  Connection,
  Place,
} from 'src/game/modules/base/models/entities/material/Place';
import { Passage } from 'src/game/modules/base/models/entities/material/thing/Passage';

type DirectionWrapper = {
  text: string;
  key: string;
};

type ConnectionWrapper = {
  connection: Connection;
  direction: DirectionWrapper;
  passage: Passage;
  usuable: boolean;
  text: string;
};

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss'],
})
export class ConnectionsComponent implements OnInit {
  @Input() entity: BaseEntity;
  private updateSubscription: Subscription;
  connections: ConnectionWrapper[] = [];
  actionText;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.updateSubscription = this.gameService.updateEvent.subscribe(() => {
      this.update();
    });
  }

  ngOnChanges() {
    this.update();
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  onClickConnection(connection: Connection): void {
    const action = this.entity.getPlay().getAction(BaseActionKeys.GoingTo);
    const player = this.entity.getPlay().getPlayer();

    action.use(player, [connection]);
  }

  update(): void {
    this.connections = [];

    if (this.entity instanceof Place) {
      const player = this.entity.getPlay().getPlayer();
      const action = this.entity.getPlay().getAction(BaseActionKeys.GoingTo);
      this.actionText = action.getText();

      this.entity.getConnections().forEach((connection) => {
        if (!connection.check || connection.check()) {
          let direction: DirectionWrapper;
          let passage: Passage;

          if (connection.directionKey) {
            const directionObject = this.entity
              .getPlay()
              .getScenario()
              .getDirections()[connection.directionKey];

            direction = {
              text: directionObject.name.printWithPreposition(),
              key: directionObject.key,
            };
          }

          if (connection.passageId) {
            passage = this.entity
              .getPlay()
              .getEntity(connection.passageId) as Passage;
          }

          let usuable = action.check(player, [connection], true).usable;
          let text = connection.text;

          this.connections.push({
            connection,
            passage,
            usuable,
            direction,
            text,
          });
        }
      });
    }
  }
}
