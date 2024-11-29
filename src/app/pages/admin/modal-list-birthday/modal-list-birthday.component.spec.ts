import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListBirthdayComponent } from './modal-list-birthday.component';

describe('ModalListBirthdayComponent', () => {
  let component: ModalListBirthdayComponent;
  let fixture: ComponentFixture<ModalListBirthdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalListBirthdayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalListBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
