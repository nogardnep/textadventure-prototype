import { EditorService } from '../../../../services/editor.service';
import { Component, Input, OnInit } from '@angular/core';
import { TextWrapper } from 'src/game/modules/story/main';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  @Input() label: string;
  @Input() model: TextWrapper;
  @Input() id: string;

  constructor(private editorService: EditorService) {}

  ngOnInit() {}

  onValueChange(): void {
    this.editorService.save();
  }
}
