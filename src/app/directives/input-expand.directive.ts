import { Directive, ElementRef, HostListener, Renderer2, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appInputExpand]'
})

export class InputExpandDirective implements AfterViewInit {

    @Output() collapsed = new EventEmitter<any>();

    constructor(private elRef: ElementRef, private renderer: Renderer2) { }

    ngAfterViewInit() {

        setTimeout(() => {

            let firstElement = this.elRef.nativeElement.getAttribute('firstElement');
            let lastElement = this.elRef.nativeElement.getAttribute('lastElement');
            let firstNextElement = this.elRef.nativeElement.getAttribute('firstNextElment');
            let thisElemId = this.elRef.nativeElement.getAttribute('id');
            let otherFieldElem = this.elRef.nativeElement.getAttribute('otherField');
            let addressAnimationElm = document.getElementById(thisElemId).querySelector(".adress_textarea");

            var allAddressElem = document.querySelectorAll(".address_expand");

            document.getElementById(firstElement).addEventListener("focus", () => {
                [].forEach.call(allAddressElem, function(el) {
                    el.classList.remove("address_expand_true");
                });
                document.getElementById(thisElemId).className += " address_expand_true";
                setTimeout(() => {
                    document.getElementById(firstNextElement).focus();
                });
            }, false);

            document.querySelector("app-root").addEventListener("click", (e) => {
                if(document.getElementById(thisElemId) !== null) {
                    // document.getElementById(thisElemId).classList.remove("address_expand_true");
                    document.getElementById(thisElemId).classList.remove("address_expand_true");
                }
                this.collapsed.emit({
                    done: true
                });
            }, false);

            if(document.querySelector("modal-container") != null) {
                document.querySelector("modal-container").addEventListener("click", (e) => {
                    if(document.getElementById(thisElemId) !== null) {
                        // document.getElementById(thisElemId).classList.remove("address_expand_true");
                        document.getElementById(thisElemId).classList.remove("address_expand_true");
                    }
                    this.collapsed.emit({
                        done: true
                    });
                }, false);
            }

            document.getElementById(thisElemId).addEventListener("click", (e) => {
                e.stopPropagation();
            }, false);

            document.getElementById(lastElement).addEventListener("keydown", (e) => {
                if(e.which == 9) {
                    document.getElementById(thisElemId).classList.remove("address_expand_true");
                    this.collapsed.emit({
                        done: true
                    });
                }
            }, false);

            document.getElementById(firstNextElement).addEventListener("keydown", (e) => {
                if(e.shiftKey && e.which == 9) {
                    document.getElementById(thisElemId).classList.remove("address_expand_true");
                    this.collapsed.emit({
                        done: true
                    });
                }
            }, false);

        });

    }

}
