import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TreatmentCycleService} from '../_services/treatment-cycle.service';
import {ExternalAttachment} from '../models/attachment.model';

@Component({
  selector: 'app-treatment-cycle-attachment-display',
  templateUrl: './treatment-cycle-attachment-display.component.html',
  styleUrls: ['./treatment-cycle-attachment-display.component.scss']
})
export class TreatmentCycleAttachmentDisplayComponent implements OnInit {
  @Input() cycleId: number;
  @Input() attachmentForm: FormGroup;
  externalAttachments: ExternalAttachment[];

  constructor(private treatmentCycleService: TreatmentCycleService) {
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

}
