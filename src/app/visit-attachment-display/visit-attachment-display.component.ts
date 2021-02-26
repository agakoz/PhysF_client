import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ExternalAttachment} from '../models/external-attachment.model';
import {VisitAttachment} from '../models/visit-attachment.model';
import {VisitsService} from '../_services/visits.service';
import {UploadedFile} from '../models/uploaded-file.model';
import {UploadService} from '../_services/upload.service';
import {UserDataFormDialogComponent} from '../user-data-form-dialog/user-data-form-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ImagePreviewDialogComponent} from '../image-preview-dialog/image-preview-dialog.component';

@Component({
  selector: 'app-visit-attachment-display',
  templateUrl: './visit-attachment-display.component.html',
  styleUrls: ['./visit-attachment-display.component.scss']
})
export class VisitAttachmentDisplayComponent implements OnInit {
  @Input() visitId: number;
  // @Input() attachmentForm: FormGroup;
  visitAttachments: VisitAttachment[];

  constructor(private visitsService: VisitsService, private uploadService: UploadService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.visitAttachments = [];
    this.getVisitAttachments();
  }

  private getVisitAttachments() {
    this.visitsService.getAttachmentsAssignedToVisit(this.visitId).subscribe(
      data => {
        this.visitAttachments = data;
        console.log(this.visitsService);
      }
    );
  };

  preview(fileId: number) {
    this.uploadService.downloadFile(fileId).subscribe(response => {
      this.dialog.open(ImagePreviewDialogComponent, {
        // minWidth: '190vh',
        maxWidth: '190vh',
        maxHeight: '80vh',
        minHeight: '80vh',
        height: '80vh',
        panelClass: 'custom-dialog-container',
        data: {
          url : response.url
        },

      })
    });
  }

  download(fileId: number) {
    let file: UploadedFile;
    this.uploadService.downloadFile(fileId).subscribe(response => {
      file = response;
      window.open(response.url);
    });
  }
}
