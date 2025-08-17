import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http: HttpClient) { }

  get(path: string): Observable<any> {
    return this.http.get<any>(path);
  }

  post(path: string, request: any): Observable<any> {
    return this.http.post(path, request);
  }
}
