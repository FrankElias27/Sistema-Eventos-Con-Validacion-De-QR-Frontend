import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddEventosComponent } from './modal-add-eventos.component';

describe('ModalAddEventosComponent', () => {
  let component: ModalAddEventosComponent;
  let fixture: ComponentFixture<ModalAddEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddEventosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
