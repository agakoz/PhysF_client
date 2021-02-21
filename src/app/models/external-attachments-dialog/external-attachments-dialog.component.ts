import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TreatmentCycleService} from '../../_services/treatment-cycle.service';

@Component({
  selector: 'app-external-attachments-dialog',
  templateUrl: './external-attachments-dialog.component.html',
  styleUrls: ['./external-attachments-dialog.component.scss']
})
export class ExternalAttachmentsDialogComponent implements OnInit {
  treatmentCycleId: number;
  attachmentForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<ExternalAttachmentsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private treatmentCycleService: TreatmentCycleService,
              ) {
  }

  ngOnInit(): void {
    this.treatmentCycleId = this.data.treatmentCycleId;
    this.attachmentForm = this.fb.group({});
    this.dialogRef.disableClose = true;
  }

  onSubmit() {
    console.log('submit:' + this.attachmentForm.get('attachment').value);
    this.treatmentCycleService.saveExternalAttachments(this.treatmentCycleId, this.attachmentForm).subscribe(data => {
      console.log(data)
      this.dialogRef.close()

    });
  }

  close() {
    this.dialogRef.close()
  }
}
