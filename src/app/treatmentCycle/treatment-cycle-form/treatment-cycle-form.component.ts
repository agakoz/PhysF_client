import {Component, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TreatmentCycleService} from '../../_services/treatment-cycle.service';

@Component({
  selector: 'app-treatment-cycle-form',
  templateUrl: './treatment-cycle-form.component.html',
  styleUrls: ['./treatment-cycle-form.component.scss']
})
export class TreatmentCycleFormComponent implements OnInit {

  @Input() cycleId: number;
  @Input() treatmentCycleForm: FormGroup
  // @Output() titleChange = new EventEmitter<string>();

  constructor(private treatmentCycleService: TreatmentCycleService) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadCycleData();
  }

  private loadCycleData() {
    if(this.cycleId > -1) {
      this.treatmentCycleService.getTreatmentCycleData(this.cycleId).subscribe(
        data => {
          this.treatmentCycleForm.get('title').setValue(data.title);
          this.treatmentCycleForm.get('description').setValue(data.description);
          this.treatmentCycleForm.get('bodyPart').setValue(data.bodyPart);
          this.treatmentCycleForm.get('injuryDate').setValue(data.injuryDate);
          this.treatmentCycleForm.get('symptoms').setValue(data.symptoms);
          this.treatmentCycleForm.get('examinationDesc').setValue(data.examinationDesc);
          this.treatmentCycleForm.get('diagnosis').setValue(data.diagnosis);
          this.treatmentCycleForm.get('treatment').setValue(data.treatment);
          this.treatmentCycleForm.get('recommendations').setValue(data.recommendations);
          this.treatmentCycleForm.get('notes').setValue(data.notes);
          this.treatmentCycleForm.get('similarPastProblems').setValue(data.similarPastProblems);

        },
        err => console.log(err)
      );
    }

  }
}
