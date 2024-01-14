import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notes-view',
  templateUrl: './notes-view.component.html',
  styleUrls: ['./notes-view.component.sass']
})
export class NotesViewComponent {

  @Input()
  imgUrl: string = '';

  @Input()
  pdfUrl: string = '';

  @Input()
  fileType: string = '';
}
