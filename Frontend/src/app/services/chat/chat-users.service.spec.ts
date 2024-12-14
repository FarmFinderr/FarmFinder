import { TestBed } from '@angular/core/testing';

import { ChatUsersService } from './chat-users.service';

describe('ChatUsersService', () => {
  let service: ChatUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
