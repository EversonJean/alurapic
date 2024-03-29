import { Directive, ElementRef, HostListener, Renderer, Input, OnInit } from '@angular/core';
import { PlatformDetectorService } from 'src/app/core/plataform-detector/platform-detector.service';

@Directive({
    selector: '[immediateClick]'
})
export class ImmediateClickDirective implements OnInit {

    constructor(
        private element: ElementRef<any>,
        private platformDetectorService: PlatformDetectorService) { }

    ngOnInit(): void {
        if(this.platformDetectorService.isPlatformBrowser()){
            this.element.nativeElement.click();
        }
    }

}