import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';
import {UploadedFile} from '../models/uploaded-file.model';
import {VisitEvent} from '../models/visitEvent.model';
import {RequestOptions, ResponseContentType} from '@angular/http';

const UPLOAD_API_URL = 'https://localhost:8443/file/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) {
  }


  planNextVisit(file: File): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(
      UPLOAD_API_URL + 'upload',
      formData,
      {responseType: 'text'}
    );
  }

  downloadFile(fileId: number): Observable<any>{
    let hdrs = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get( UPLOAD_API_URL + 'download/' + fileId,  {headers: hdrs, observe: 'response', responseType: 'blob'});
  }

  getFile(fileId: number): Observable<any>{
    let hdrs = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get( UPLOAD_API_URL + 'get/' + fileId,  {headers: hdrs, observe: 'response', responseType: 'blob'});
  }
}
