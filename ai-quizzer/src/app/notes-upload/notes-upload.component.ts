import { Component } from '@angular/core';
import { FileService } from '../file.service';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { ViewChild } from '@angular/core';
import { NotesViewComponent } from '../notes-view/notes-view.component';

@Component({
  selector: 'app-notes-upload',
  templateUrl: './notes-upload.component.html',
  styleUrls: ['./notes-upload.component.sass']
})
export class NotesUploadComponent {
  protected fileNames: string[] = [];
  protected fileStatus = {
    percent: 0,
    status: '',
    requestType: ''
  };
  public fileType: string = '';
  public fileList!: FileList | null;

  @ViewChild('viewFileReference') viewFile!: NotesViewComponent;

  constructor(private fileService: FileService){}
  
  onUploadFiles(e: Event): void{
    const{target} = e;
    this.fileList = (target as HTMLInputElement).files;
    const formData = new FormData();
    for (const file of this.fileList!) { 
      this.fileType = file.type;
      formData.append('files', file, file.name); 
    }
    this.fileService.upload(formData).subscribe(
      event=>{
        console.log("File potential: " + event);
        this.reportProgress(event);
      },
      (error: HttpErrorResponse) =>{
        console.log(error);
      }
    );
    this.viewFile.onTrigger(this.fileList);

  }

  onDownload(filename: string): void{
    this.fileService.download(filename).subscribe(
      event=>{
        //console.log(event);
        this.reportProgress(event)
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  reportProgress(httpEvent: HttpEvent<string[] | Blob>){
    switch(httpEvent.type){
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, "Uploading... ");
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, "Downloading... ");
        break;
      case HttpEventType.ResponseHeader:
        //console.log("Event returned ", httpEvent);
        break;
      case HttpEventType.Response:
        if(httpEvent.body instanceof Array){
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body)
            {this.fileNames.unshift(filename)}
        } else{
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, 
                  {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
        }
        this.fileStatus.status = 'done'
        break;
      default:
        //console.log(httpEvent);
        break;
    }
  }

  updateStatus(loaded: number, total: number, requestType: string){
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100* loaded/total);
  }

}
