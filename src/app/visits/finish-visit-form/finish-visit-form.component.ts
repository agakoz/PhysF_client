// import {Component, Input, OnInit} from '@angular/core';
// import {FormGroup} from '@angular/forms';
// import {Visit} from '../../models/visit.model';
//
// @Component({
//   selector: 'app-finish-visit-form',
//   templateUrl: './finish-visit-form.component.html',
//   styleUrls: ['./finish-visit-form.component.scss']
// })
// export class FinishVisitFormComponent implements OnInit {
//   @Input() visitForm: FormGroup
//   @Input() visit: Visit
//   constructor() { }
//
//   ngOnInit(): void {
//     setPassedVisitData()
//   }
//   private setPassedVisitData() {
//     this.loadTreatmentCycleList();
//     this.getPatientBasicInfo();
//     this.visitForm.get('id').setValue(this.visitStarted.id);
//     this.visitForm.get('date').setValue(this.visitStarted.date);
//     this.visitForm.get('startTime').setValue(this.visitStarted.startTime);
//     this.visitForm.get('endTime').setValue(this.visitStarted.endTime);
//     this.visitForm.get('notes').setValue(this.visitStarted.notes);
//   }
//   private loadTreatmentCycleList() {
//     let patientId = this.visitStarted.patientId;
//     this.treatmentCycleService.getPatientTreatmentCycles(patientId).subscribe(
//       data => {
//         this.treatmentCycleList = data;
//         this.visitStarted.treatmentCycleTitle != null  ? this.isTreatmentContinuation = true: this.isTreatmentContinuation = false;
//
//         if (this.isTreatmentContinuation && this.treatmentCycleList != null) {
//           const toSelect = this.treatmentCycleList.find(c => c.id == this.visitStarted.treatmentCycleId);
//           this.visitForm.get('treatmentCycle').setValue(toSelect);
//         } else {
//           this.visitForm.get('treatmentCycle').setValue(-1);
//         }
//         this.treatmentCycleForm.get('id').setValue(this.visitForm.get('treatmentCycle').value);
//       });
//
//   }
//
//   manageContinuation() {
//     this.isTreatmentContinuation = !this.isTreatmentContinuation;
//     if (!this.isTreatmentContinuation) {
//       this.visitForm.get('treatmentCycle').setValue(-1);
//     }
//   }
// }
