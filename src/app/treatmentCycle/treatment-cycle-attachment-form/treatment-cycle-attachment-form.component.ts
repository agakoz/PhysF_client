import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UploadService} from '../../_services/upload.service';
import {stringify} from '@angular/compiler/src/util';

@Component({
  selector: 'app-treatment-cycle-attachment-form',
  templateUrl: './treatment-cycle-attachment-form.component.html',
  styleUrls: ['./treatment-cycle-attachment-form.component.scss']
})
export class TreatmentCycleAttachmentFormComponent implements OnInit {
  @Input() cycleId: number;
  @Input() attachmentForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private uploadService: UploadService) {
  }

  ngOnInit(): void {
  }

  get attachments() {
    return this.attachmentForm.get('attachment') as FormArray;
  }

  addAttachment() {
    this.attachments.push(this.fb.group({
      id: new FormControl({value: -1, disabled: false}),
      fileName: new FormControl({value: '', disabled: false}),
      fileId: new FormControl({value: -1, disabled: false}),
      link: new FormControl({value: '', disabled: false}),
      description: new FormControl({value: '', disabled: false}, Validators.required),
    }));
  }

  deleteSellingPoint(index) {
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

}
