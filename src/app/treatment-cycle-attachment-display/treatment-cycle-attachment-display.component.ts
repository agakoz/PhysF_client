import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TreatmentCycleService} from '../_services/treatment-cycle.service';
import {ExternalAttachment} from '../models/external-attachment.model';
import {UploadService} from '../_services/upload.service';
import * as fileSaver from 'file-saver';
import {UploadedFile} from '../models/uploaded-file.model';

@Component({
  selector: 'app-treatment-cycle-attachment-display',
  templateUrl: './treatment-cycle-attachment-display.component.html',
  styleUrls: ['./treatment-cycle-attachment-display.component.scss']
})
export class TreatmentCycleAttachmentDisplayComponent implements OnInit {
  @Input() cycleId: number;
  // @Input() attachmentForm: FormGroup;
  externalAttachments: ExternalAttachment[];

  constructor(private treatmentCycleService: TreatmentCycleService, private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.getExternalAttachments();
  }


  private getExternalAttachments() {
    this.treatmentCycleService.getTreatmentCycleExternalAttachments(this.cycleId).subscribe(
      data => {
        this.externalAttachments = data;
        console.log(this.externalAttachments);
      }
    );
  };

  downloadFile(id: number) {
    console.log(id)
    let file: UploadedFile
    this.uploadService.downloadFile(id).subscribe(response => {
      file = response
      window.open(response.url);
    });
  }
}
