import { TestBed } from '@angular/core/testing';

import { Autentificación } from './autentificación';

describe('Autentificación', () => {
  let service: Autentificación;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Autentificación);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
