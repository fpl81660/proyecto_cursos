import { TestBed } from '@angular/core/testing';

import { carrito } from './carrito';

describe('Carrito', () => {
  let service: carrito;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(carrito);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
