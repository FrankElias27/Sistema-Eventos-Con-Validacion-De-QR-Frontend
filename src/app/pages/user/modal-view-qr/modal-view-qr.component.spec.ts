import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewQrComponent } from './modal-view-qr.component';

describe('ModalViewQrComponent', () => {
  let component: ModalViewQrComponent;
  let fixture: ComponentFixture<ModalViewQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewQrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
