import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-notes-view',
  templateUrl: './notes-view.component.html',
  styleUrls: ['./notes-view.component.sass']
})
export class NotesViewComponent {

  @Input()
  imgUrl: string = '';

  @Input()
  pdfUrl: SafeResourceUrl = '';

  @Input()
  fileType: string = '';

  fileList!: FileList | null;

  constructor(private sanitizer: DomSanitizer){}

  public onTrigger(fileList: FileList | null){
    if(fileList){
      this.fileList = fileList;
      this.fileType = fileList[0].type;


      if(this.fileType.includes('image')){
        const reader = new FileReader();
        reader.onload = (e:any) => {
          this.imgUrl = e.target.result;
        };
        reader.readAsDataURL(fileList[0]);
      }

      if(this.fileType.includes('pdf')){
        const objectUrl = URL.createObjectURL(fileList[0]);
        //URL.revokeObjectURL(this.pdfUrl);

        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
      }
    }
  }
}
