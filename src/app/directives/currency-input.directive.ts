import { Directive, ElementRef, HostListener, Renderer2, AfterViewInit, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';

import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '../pipes/currencyFilter.pipe';

@Directive({
  selector: '[currencyInput]'
})

export class CurrencyInputDirective implements OnInit {

    private el: any;

    constructor(private elementRef:ElementRef, private formatCurrency:CurrencyPipe) {
        this.el = this.elementRef.nativeElement;
    }

    ngOnInit(){
        this.el.value = this.formatCurrency.transform(this.el.value, 'input');
    }

    @HostListener('keydown', ['$event']) onKeyDown(event) {
        if (event.which > 47 && event.which < 58) {

        }
        else if(event.which > 95 && event.which < 106) {

        }
        else if(event.which == 37) {

        }
        else if(event.which == 110) {

        }
        else if(event.which == 9) {

        }
        else if(event.which == 38) {

        }
        else if(event.which == 39) {

        }
        else if(event.which == 40) {

        }
        else if(event.which == 8) {

        }
        else if(event.which == 16) {

        }
        else if(event.which == 17) {

        }
        else if(event.which == 20) {

        }
        else if(event.which == 27) {

        }
        else if(event.which == 46) {

        }
        else {
            event.preventDefault();
        }
    }

    @HostListener('keyup', ['$event']) onKeyUp(event) {
        let string = event.target.value.replace(/[^0-9]+/g, "");
        event.target.value = this.formatCurrency.transform(string, 'input');
    }

}
