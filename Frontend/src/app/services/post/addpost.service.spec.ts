import { TestBed } from '@angular/core/testing';

import { AddpostService } from './addpost.service';

describe('AddpostService', () => {
  let service: AddpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
