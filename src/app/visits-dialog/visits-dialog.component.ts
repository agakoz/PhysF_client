import {Component, Inject, OnInit} from '@angular/core';
import {VisitsService} from '../visits.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-incoming-visits-dialog',
  templateUrl: './visits-dialog.component.html',
  styleUrls: ['./visits-dialog.component.scss']
})
export class VisitsDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private visits: VisitsService) { }

  ngOnInit(): void {
  }

}
