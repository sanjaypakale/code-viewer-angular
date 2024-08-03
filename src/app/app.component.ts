import { Component } from '@angular/core';
import * as Prism from 'prismjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prismjs-test';
  selectedFile: string = '';

  onFileSelected(filePath: string): void {
    console.log('file clicked....')
    console.log(filePath)
    this.selectedFile = filePath;
  }
}
