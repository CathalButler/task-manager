import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Import for contact Service, used for adding and display contacts with the backend server.
import { ApiService } from './services/api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Import for HTTP requests
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Importted Components
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { CompletedComponent } from './completed/completed.component';
import { NoteComponent } from './note/note.component';
import { EditComponent } from './edit/edit.component';
import { TodayComponent } from './today/today.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
//Import for Forms
import { FormsModule } from "@angular/forms";

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatSidenavModule,
  MatDividerModule,
  MatListModule,
  MatFormFieldModule,
  MatDialogModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ViewComponent,
    CompletedComponent,
    NoteComponent,
    EditComponent,
    PageNotFoundComponent,
    TodayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatDialogModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
  ],
  /* Because MatDialog instantiates components at run-time, the Angular compiler 
   * needs extra information to create the necessary ComponentFactory for your dialog 
   * content component. 
   * Pages that use the import 'MatDialog':
   *    - CreateComponent
   *    - NoteComponent
   */
  entryComponents: [
    CreateComponent,
    NoteComponent
  ],
  providers: [ApiService, CreateComponent, ViewComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
