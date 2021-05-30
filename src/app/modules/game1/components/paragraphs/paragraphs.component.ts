import { GameService } from 'src/app/services/game.service';
import { Subscription } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Entity } from 'src/game/core/models/Entity';
import { Paragraph } from 'src/game/core/models/Paragraph';

@Component({
  selector: 'app-paragraphs',
  templateUrl: './paragraphs.component.html',
  styleUrls: ['./paragraphs.component.scss'],
})
export class ParagraphsComponent implements OnInit {
  @Input() paragraphs: Paragraph[];
  @Output() itemClicked = new EventEmitter<Entity>();
  toShow: Paragraph[];
  updateSubscription: Subscription;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.updateSubscription = this.gameService.updateEvent.subscribe(() => {
      this.update;
    });
  }

  ngOnChanges() {
    this.update();
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  onClickItem(entity: Entity): void {
    this.itemClicked.emit(entity);
  }

  private update() {
    this.toShow = [];
    this.paragraphs.forEach((item) => {
      if (!item.check || item.check()) {
        this.toShow.push(item);
      }
    });
  }
}
