import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewMailComponent } from './modal-view-mail.component';

describe('ModalViewMailComponent', () => {
  let component: ModalViewMailComponent;
  let fixture: ComponentFixture<ModalViewMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
