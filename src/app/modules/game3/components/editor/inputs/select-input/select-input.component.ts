import { EditorService } from './../../../../services/editor.service';
import { Component, Input, OnInit } from '@angular/core';
import { DescriptorId, EntityDescriptor } from 'src/game/modules/story/main';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
})
export class SelectInputComponent implements OnInit {
  @Input() id: string;
  @Input() model: DescriptorId;
  @Input() list: EntityDescriptor[];
  @Input() label: string;
  language: string;

  constructor(private editorService: EditorService) {
    this.language = this.editorService.getLanguage();
  }

  ngOnInit() {}

  onValueChange(): void {
    this.editorService.save();
  }
}
