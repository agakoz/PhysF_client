import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {VisitFormDialogComponent} from '../visits/start-visit-dialog/visit-form-dialog.component';

@Component({
  selector: 'app-visit-attachment-display-dialog',
  templateUrl: './visit-attachment-display-dialog.component.html',
  styleUrls: ['./visit-attachment-display-dialog.component.scss']
})
export class VisitAttachmentDisplayDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<VisitAttachmentDisplayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

}
