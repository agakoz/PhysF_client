import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-handle-event-dialog',
  templateUrl: './handle-event-question-dialog.component.html',
  styleUrls: ['./handle-event-question-dialog.component.scss']
})
export class HandleEventQuestionDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<HandleEventQuestionDialogComponent>) { }

  ngOnInit(): void {
  }

  closeWithStartMessage() {
    this.dialogRef.close({event: 'startVisit'});

  }

  closeWithEditMessage() {
    this.dialogRef.close({event: 'editVisit'});

  }

  closeWithCancelMessage() {
    this.dialogRef.close({event: 'cancelVisit'});

  }
}
