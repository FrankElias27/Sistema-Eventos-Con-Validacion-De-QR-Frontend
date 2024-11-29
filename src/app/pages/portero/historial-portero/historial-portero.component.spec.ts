import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPorteroComponent } from './historial-portero.component';

describe('HistorialPorteroComponent', () => {
  let component: HistorialPorteroComponent;
  let fixture: ComponentFixture<HistorialPorteroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialPorteroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialPorteroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
