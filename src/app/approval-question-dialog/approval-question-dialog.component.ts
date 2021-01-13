import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-approval-question-dialog',
  templateUrl: './approval-question-dialog.component.html',
  styleUrls: ['./approval-question-dialog.component.scss']
})
export class ApprovalQuestionDialogComponent implements OnInit {
  message: string;


  constructor(
    private dialogRef: MatDialogRef<ApprovalQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {

  }

  approve() {
    this.dialogRef.close({event: 'Approved'});
  }

  cancel() {
    this.dialogRef.close({event: 'Canceled'});
  }
}
