import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInviteDialogComponent } from './edit-invite-dialog.component';

describe('EditInviteDialogComponent', () => {
  let component: EditInviteDialogComponent;
  let fixture: ComponentFixture<EditInviteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInviteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInviteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
