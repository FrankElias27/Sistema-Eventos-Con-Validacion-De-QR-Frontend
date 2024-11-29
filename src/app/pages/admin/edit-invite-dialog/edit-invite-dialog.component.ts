import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-invite-dialog',
  templateUrl: './edit-invite-dialog.component.html',
  styleUrls: ['./edit-invite-dialog.component.css']
})
export class EditInviteDialogComponent {

  inviteForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditInviteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { invite: any },
    private fb: FormBuilder
  ) {
    this.inviteForm = this.fb.group({
      nombre: [
        data.invite.nombre,
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]
      ],
      dni: [
        data.invite.dni,
        [Validators.required, Validators.pattern(/^\d{8}$/)]
      ],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.inviteForm.valid) {
      this.dialogRef.close(this.inviteForm.value);
    }
  }
}
