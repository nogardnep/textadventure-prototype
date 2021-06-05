import { TestBed } from '@angular/core/testing';

import { EditorInterfaceService } from './editor-interface.service';

describe('EditorInterfaceService', () => {
  let service: EditorInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
