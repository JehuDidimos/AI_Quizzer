import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesUploadComponent } from './notes-upload/notes-upload.component';
import { HttpClientModule } from '@angular/common/http';
import { NotesViewComponent } from './notes-view/notes-view.component'

@NgModule({
  declarations: [
    AppComponent,
    NotesUploadComponent,
    NotesViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
