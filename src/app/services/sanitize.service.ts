import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SanitizeService {
  constructor(private sanitizer: DomSanitizer) {}

  sanitizeHtml(input: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(input);
  }
}
