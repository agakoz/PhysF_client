import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';
import {TreatmentCycleService} from '../../_services/treatment-cycle.service';
import {VisitsService} from '../../_services/visits.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PatientsService} from '../../_services/patients.service';
import {FinishedVisit} from '../../models/finished-visit';
import {Patient} from '../../models/patient.model';
import {UserService} from '../../_services/user.service';
import {User} from '../../models/user.model';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import * as autoTable from 'jspdf-autotable';
// import 'jspdf-autotable'

declare const require: any;
@Component({
  selector: 'app-treatment-cycle-history-dialog',
  templateUrl: './treatment-cycle-history-dialog.component.html',
  styleUrls: ['./treatment-cycle-history-dialog.component.scss']
})
export class TreatmentCycleHistoryDialogComponent implements OnInit {

  treatmentCycleForm: FormGroup;
  visitForm: FormGroup;
  visitsList: FinishedVisit[];
  patient: Patient;
  user: User;

  constructor(
    private dialogRef: MatDialogRef<TreatmentCycleHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe,
    private treatmentCycleService: TreatmentCycleService,
    private visitsService: VisitsService,
    private patientsService: PatientsService,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.initTreatmentCycleForm();
    this.initVisitForm();
    this.loadTreatmentCycleData();
    this.loadUserData();
    this.loadPatientData();
    this.loadVisitsData();
  }

  private initTreatmentCycleForm() {
    this.treatmentCycleForm = new FormGroup({
      id: new FormControl({value: null, disabled: true}),
      title: new FormControl({value: null, disabled: true}),
      bodyPart: new FormControl({value: null, disabled: true}),
      description: new FormControl({value: null, disabled: true}),
      injuryDate: new FormControl({value: null, disabled: true}),
      symptoms: new FormControl({value: null, disabled: true}),
      examinationDesc: new FormControl({value: null, disabled: true}),
      diagnosis: new FormControl({value: null, disabled: true}),
      treatment: new FormControl({value: null, disabled: true}),
      recommendations: new FormControl({value: null, disabled: true}),
      notes: new FormControl({value: null, disabled: true}),
      similarPastProblems: new FormControl({value: null, disabled: true}),
    });
  }

  private loadTreatmentCycleData() {
    this.treatmentCycleService.getTreatmentCycleData(this.data.treatmentCycleId).subscribe(
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

  private loadPatientData() {
    this.patientsService.getPatientPersonalData(this.data.patientId).subscribe(
      result => {
        this.patient = result;

      }
    );
  }

  private loadVisitsData() {
    this.visitsService.getFinishedVisitsDataFromTreatmentCycle(this.data.treatmentCycleId).subscribe(
      result => {
        this.visitsList = result;
      }
    );
  }

  private initVisitForm() {
    this.visitForm = new FormGroup({
      id: new FormControl({},),
      date: new FormControl({value: null, disabled: true}),
      startTime: new FormControl({value: null, disabled: true}),
      endTime: new FormControl({value: null, disabled: true}),
      notes: new FormControl({value: null, disabled: true}),
    });
  }

  private loadUserData() {
    this.userService.getPersonalInfo().subscribe(
      data => {
        console.log(data)
        this.user = data;
      }
    );
  }

  // convertToPdf() {
    // var pdf = new jsPDF('p','pt','a4');
    // pdf.fromHTML(document.body,function() {});
    // pdf.save('Estadodecuenta.pdf');
    // var data = document.getElementById('pdf');
    // html2canvas(data).then(canvas => {
    //   // Few necessary setting options
    //   var imgWidth = 208;
    //   var pageHeight = 295;
    //   var imgHeight = canvas.height * imgWidth / canvas.width;
    //   var heightLeft = imgHeight;
    //
    //   const contentDataURL = canvas.toDataURL('image/png')
    //   let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    //   var position = 0;
    //   // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    //   pdf.save('aaa.pdf'); // Generated PDF
    // });
  //
  //   const jsPDF = require('jspdf');
  //   require('jspdf-autotable');
  //   var doc = new jsPDF();
  //   doc.autoTable({html: '#pdf'});
  //   // doc.output("dataurlnewwindow");
  // doc.save('aaa.pdf')
  // }

  convertToPdf() {

    var data = document.getElementById('pdf');  //Id of the table
    var currentPosition = document.getElementById("pdf").scrollTop;
    html2canvas(data, {scrollY: -window.scrollY, scale: 1 }).then(canvas => {
      var HTML_Width = document.getElementById("pdf").offsetWidth;
      // console.log(HTML_Width)
      var HTML_Height = document.getElementById("pdf").scrollHeight;
      var top_left_margin = 30;
      var PDF_Width = HTML_Width+(top_left_margin*2);
      var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
      var canvas_image_width = HTML_Width;
      var canvas_image_height = HTML_Height;

      var totalPDFPages = Math.ceil(HTML_Height/PDF_Height);
        canvas.getContext('2d');
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
        for (var i = 1; i < totalPDFPages; i++) {
          pdf.addPage([PDF_Width, PDF_Height] );
          pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
        }
        pdf.save(this.patient.getFullName().replace(" ", "_") + "_" + this.treatmentCycleForm.get("title").value.replace(" ", "_")+ ".pdf");
    });
  }
}
