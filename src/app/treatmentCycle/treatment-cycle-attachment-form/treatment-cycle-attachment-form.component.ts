import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-treatment-cycle-attachment-form',
  templateUrl: './treatment-cycle-attachment-form.component.html',
  styleUrls: ['./treatment-cycle-attachment-form.component.scss']
})
export class TreatmentCycleAttachmentFormComponent implements OnInit {
  attachmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.attachmentForm = this.fb.group({

      attachment: this.fb.array([this.fb.group({
        file: '',
        link: '',
        description: '',
      })])
    });
  }

  get attachments() {
    return this.attachmentForm.get('attachment') as FormArray;
  }

  addSellingPoint() {
    console.log(this.attachments)
    this.attachments.push(this.fb.group({
      file: '',
      link: '',
      description: '',
    }));
  }

  deleteSellingPoint(index) {
    // this.attachments.removeAt(index);
    console.log(this.attachmentForm.value)
  }
  selectFile( event, index: number) {
    // console.log(this.attachments.value[index])
    this.attachments.value[index].file = event.target.files;
    console.log(this.attachments.value[index])

  }
}
