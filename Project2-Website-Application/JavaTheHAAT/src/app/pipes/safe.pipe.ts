import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';



// In order to user interpolation in the profile.html file for the src attribute of the iframe tag, we have to "sanitize the URL"
// So I created a pipe that does this sanitization to make the string URL turn to type SafeResourceUrl
@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
