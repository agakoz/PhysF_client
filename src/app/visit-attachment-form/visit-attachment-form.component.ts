import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ExternalAttachment} from '../models/external-attachment.model';
import {UploadedFile} from '../models/uploaded-file.model';
import {UploadService} from '../_services/upload.service';
import {VisitsService} from '../_services/visits.service';
import {VisitAttachment} from '../models/visit-attachment.model';

@Component({
  selector: 'app-visit-attachment-form',
  templateUrl: './visit-attachment-form.component.html',
  styleUrls: ['./visit-attachment-form.component.scss']
})
export class VisitAttachmentFormComponent implements OnInit {
  @Input() visitId: number;
  @Input() attachmentForm: FormGroup;
  @Output() attachmentFormChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  constructor(
    private uploadService: UploadService,
    private visitService: VisitsService,
    private fb: FormBuilder) { }
    url:any

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.attachments != null) {
      this.clearAttachments();
    }
    this.getVisitAttachments();
  }

  get attachments() {
    return this.attachmentForm.get('attachment') as FormArray;
  }

  addAttachment() {
    if (this.attachments == null) {
      console.log(this.attachmentForm);
      this.attachmentForm.addControl(
        'attachment', this.fb.array(
          [this.fb.group({
            id: new FormControl({value: -1, disabled: false}),
            fileName: new FormControl({value: '', disabled: false}),
            fileId: new FormControl({value: -1, disabled: false}, Validators.required),
            description: new FormControl({value: '', disabled: false}),
          })]
        )
      );

    } else {
      this.attachments.push(this.fb.group({
        id: new FormControl({value: -1, disabled: false}),
        fileName: new FormControl({value: '', disabled: false}),
        fileId: new FormControl({value: -1, disabled: false}, Validators.required),
        description: new FormControl({value: '', disabled: false}),
      }));
    }
    this.attachmentFormChange.emit(this.attachmentForm);
  }

  putAttachment(attachment: VisitAttachment) {
    if (this.attachments == null) {
      this.attachmentForm.addControl(
        'attachment', this.fb.array(
          [this.fb.group({
            id: new FormControl({value: attachment.id, disabled: false}),
            fileName: new FormControl({value: attachment.fileName, disabled: false}),
            fileId: new FormControl({value: attachment.fileId == null ? -1 : attachment.fileId, disabled: false}, Validators.required),
            description: new FormControl({value: attachment.description, disabled: false}),
          })]
        )
      );
    } else {
      this.attachments.push(this.fb.group({
        id: new FormControl({value: attachment.id, disabled: false}),
        fileName: new FormControl({value: attachment.fileName, disabled: false}),
        fileId: new FormControl({value: attachment.fileId == null ? -1 : attachment.fileId, disabled: false}, Validators.required),
        description: new FormControl({value: attachment.description, disabled: false}, ),
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

  private getVisitAttachments() {
    if (this.visitId > -1) {
      this.visitService.getAttachmentsAssignedToVisit(this.visitId).subscribe(
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

  deleteFile(index: number) {
    this.attachments.value[index].fileName = '';
    this.attachments.controls[index].get('fileId').setValue(-1);
    this.attachments.controls[index].get('fileName').setValue('');
  }

  preview(index: any) {
    let fileId: number;
    fileId=  this.attachments.controls[index].get('fileId').value;
    console.log(fileId);
    let file: UploadedFile;
    this.uploadService.downloadFile(fileId).subscribe(response => {
      file = response;
      console.log(response.url);
      this.url = response.url
    });
  }
}
