import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialJuniorComponent } from './historial-junior.component';

describe('HistorialJuniorComponent', () => {
  let component: HistorialJuniorComponent;
  let fixture: ComponentFixture<HistorialJuniorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialJuniorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialJuniorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
