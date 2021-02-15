import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
const UPLOAD_API_URL = 'https://localhost:8443/file/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }


  planNextVisit(file: File): Observable<any> {
    let formData: FormData = new FormData();
    formData.append("file", file)
    return this.http.post(
      UPLOAD_API_URL + 'upload',
      formData,
      {responseType: 'text'}
    );
  }
}
