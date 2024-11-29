import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMailConfigurationComponent } from './modal-mail-configuration.component';

describe('ModalMailConfigurationComponent', () => {
  let component: ModalMailConfigurationComponent;
  let fixture: ComponentFixture<ModalMailConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMailConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMailConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
