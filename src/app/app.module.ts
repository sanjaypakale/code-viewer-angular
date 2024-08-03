import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DirectoryTreeComponent } from './directory-tree/directory-tree.component';
import { FileContentViewerComponent } from './file-content-viewer/file-content-viewer.component';
import { HighlightService } from './highlight.service';


@NgModule({
  declarations: [
    AppComponent,
    DirectoryTreeComponent,
    FileContentViewerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Add HttpClientModule here
    MatTreeModule,
    MatIconModule,
    AppRoutingModule, BrowserAnimationsModule
  ],
  providers: [HighlightService],
  bootstrap: [AppComponent]
})
export class AppModule { }
