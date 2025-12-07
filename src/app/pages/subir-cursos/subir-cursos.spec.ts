import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirCursos } from './subir-cursos';

describe('SubirCursos', () => {
  let component: SubirCursos;
  let fixture: ComponentFixture<SubirCursos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirCursos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirCursos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
