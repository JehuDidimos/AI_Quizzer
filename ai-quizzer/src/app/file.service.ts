import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private server = 'http://localhost:8080'

  constructor(private httpClient: HttpClient) { }

  upload(formData: FormData): Observable<HttpEvent<string[]>>{
    return this.httpClient.post<string[]>(`${this.server}/notes/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  download(filename: string): Observable<HttpEvent<Blob>>{
    return this.httpClient.get(`${this.server}/notes/download/${filename}`,{
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }
}
