import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-approve-question-plan-visit-dialog',
  templateUrl: './approve-question-plan-visit-dialog.component.html',
  styleUrls: ['./approve-question-plan-visit-dialog.component.scss']
})
export class ApproveQuestionPlanVisitDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ApproveQuestionPlanVisitDialogComponent>,
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
