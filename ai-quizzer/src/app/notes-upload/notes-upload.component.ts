import { Component } from '@angular/core';
import { FileService } from '../file.service';

@Component({
  selector: 'app-notes-upload',
  templateUrl: './notes-upload.component.html',
  styleUrls: ['./notes-upload.component.sass']
})
export class NotesUploadComponent {
  private fileNames: string[] = [];
  private fileStatus = {
    percent: 0,
    status: '',
    responseType: ''
  }

  constructor(private fileService: FileService){}
  
  

}
