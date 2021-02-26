import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-image-preview-dialog',
  templateUrl: './image-preview-dialog.component.html',
  styleUrls: ['./image-preview-dialog.component.scss']
})
export class ImagePreviewDialogComponent implements OnInit {


  constructor(
    private dialogRef: MatDialogRef<ImagePreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
  }

}
