import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UploadService} from '../../_services/upload.service';
import {stringify} from '@angular/compiler/src/util';
import {TreatmentCycleService} from '../../_services/treatment-cycle.service';
import {ExternalAttachment} from '../../models/attachment.model';
import {UploadedFile} from '../../models/uploaded-file.model';

@Component({
  selector: 'app-treatment-cycle-attachment-form',
  templateUrl: './treatment-cycle-attachment-form.component.html',
  styleUrls: ['./treatment-cycle-attachment-form.component.scss']
})
export class TreatmentCycleAttachmentFormComponent implements OnInit {
  @Input() cycleId: number;
  @Input() attachmentForm: FormGroup;
  @Output() attachmentFormChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private uploadService: UploadService,
    private treatmentCycleService: TreatmentCycleService) {
  }

  ngOnInit(): void {
    this.getExternalAttachments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.attachments != null) {
      this.clearAttachments();
    }
    this.getExternalAttachments();
  }

  get attachments() {
    return this.attachmentForm.get('attachment') as FormArray;
  }

  addAttachment() {
    if (this.attachments == null) {
      console.log(this.attachmentForm)
      this.attachmentForm.addControl(
        'attachment', this.fb.array(
          [this.fb.group({
            id: new FormControl({value: -1, disabled: false}),
            fileName: new FormControl({value: '', disabled: false}),
            fileId: new FormControl({value: -1, disabled: false}),
            link: new FormControl({value: '', disabled: false}),
            description: new FormControl({value: '', disabled: false}, Validators.required),
          })]
        )
      );
      console.log(this.attachmentForm)

    } else {
      this.attachments.push(this.fb.group({
        id: new FormControl({value: -1, disabled: false}),
        fileName: new FormControl({value: '', disabled: false}),
        fileId: new FormControl({value: -1, disabled: false}),
        link: new FormControl({value: '', disabled: false}),
        description: new FormControl({value: '', disabled: false}, Validators.required),
      }));
    }
    this.attachmentFormChange.emit(this.attachmentForm);
  }

  putAttachment(attachment: ExternalAttachment) {
    if (this.attachments == null) {
      this.attachmentForm.addControl(
        'attachment', this.fb.array(
          [this.fb.group({
            id: new FormControl({value: attachment.id, disabled: false}),
            fileName: new FormControl({value: attachment.fileName, disabled: false}),
            fileId: new FormControl({value: attachment.fileId == null ? -1 : attachment.fileId, disabled: false}),
            link: new FormControl({value: attachment.link, disabled: false}),
            description: new FormControl({value: attachment.description, disabled: false}, Validators.required),
          })]
        )
      );
    } else {
      this.attachments.push(this.fb.group({
        id: new FormControl({value: attachment.id, disabled: false}),
        fileName: new FormControl({value: attachment.fileName, disabled: false}),
        fileId: new FormControl({value: attachment.fileId == null ? -1 : attachment.fileId, disabled: false}),
        link: new FormControl({value: attachment.link, disabled: false}),
        description: new FormControl({value: attachment.description, disabled: false}, Validators.required),
      }));
    }
    this.attachmentFormChange.emit(this.attachmentForm);

  }

  deleteAttachment(index) {
    this.attachments.removeAt(index);
  }

  selectFile(event, index: number) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    this.uploadService.planNextVisit(files[0]).subscribe(data => {
      this.attachments.value[index].fileName = files[0].name;
      this.attachments.controls[index].get('fileId').setValue(data);
      this.attachments.controls[index].get('fileName').setValue(files[0].name);
    });

  }

  private getExternalAttachments() {
    if(this.cycleId > -1) {
      this.treatmentCycleService.getTreatmentCycleExternalAttachments(this.cycleId).subscribe(
        data => {
          data.forEach(attachment => this.putAttachment(attachment));
        }
      );
    }

  };

  download(fileId: number) {
    console.log(fileId);
    let file: UploadedFile;
    this.uploadService.downloadFile(fileId).subscribe(response => {
      file = response;
      window.open(response.url);
    });
  }

  private clearAttachments() {
    for (let i = 0; i < this.attachments.length; i++) {
      this.deleteAttachment(i);
    }
  }

}

