import { Component, Input, OnChanges, SimpleChanges, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import Prism from 'prismjs';
import 'prismjs/components/index';
import 'prismjs';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-ruby';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { HighlightService } from '../highlight.service';
declare var Prism: any;

@Component({
  selector: 'app-file-content-viewer',
  templateUrl: './file-content-viewer.component.html',
  styleUrls: ['./file-content-viewer.component.css']
})
export class FileContentViewerComponent implements OnChanges, AfterViewInit {
  @Input() filePath: string = ''
  fileContent: SafeHtml = '';
  fileType: string = '';
  private highlighted: boolean = false
  language: string = 'xml';
  constructor(private http: HttpClient, private highlightService: HighlightService, private sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('file changed')
    console.log(changes)
    if (changes['filePath'] && this.filePath) {
      this.http.get('http://localhost:8080/code-preview/file', {
        params: { filePath: this.filePath }, responseType: 'text'
      }).subscribe((data: any) => {
        const language = this.filePath.split('.').pop() ?? 'none';
        const html = Prism.highlight(data, Prism.languages[language], language);
        this.fileContent = html;;
       // this.fileType = this.getFileType(this.filePath);
        setTimeout(() => Prism.highlightAll(), 0);
      });
    }
  }

  ngAfterViewInit(): void {
    if (!this.highlighted) {
      this.highlightService.highlightAll()
      this.highlighted = true
    }
  }

  getFileType(filePath: string): string {
    const extension = filePath.split('.').pop() ?? 'none';
    const extensionToLanguageMap: { [key: string]: string } = {
      'java': 'language-java',
      'xml': 'language-xml',
      'html': 'language-html',
      'ts': 'language-typescript',
      'js': 'language-javascript',
      'md': 'language-markdown'
    };
    console.log('language set is .')
    console.log(extensionToLanguageMap[extension] ?? 'language-none')
    return extensionToLanguageMap[extension] ?? 'language-none';
  }
}
