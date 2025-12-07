import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUsusarios } from './registro-ususarios';

describe('RegistroUsusarios', () => {
  let component: RegistroUsusarios;
  let fixture: ComponentFixture<RegistroUsusarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroUsusarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroUsusarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
