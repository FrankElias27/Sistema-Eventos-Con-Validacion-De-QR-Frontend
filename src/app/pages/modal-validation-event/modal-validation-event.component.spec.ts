import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalValidationEventComponent } from './modal-validation-event.component';

describe('ModalValidationEventComponent', () => {
  let component: ModalValidationEventComponent;
  let fixture: ComponentFixture<ModalValidationEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalValidationEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalValidationEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
