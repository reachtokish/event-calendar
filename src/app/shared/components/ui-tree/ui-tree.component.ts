import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
  selector: 'ui-tree',
  templateUrl: './ui-tree.component.html',
  styleUrls: ['./ui-tree.component.scss']
})

export class uiTreeComponent implements OnInit {

    @Input('data') items: Array<Object>;
    @Input('key') key: string;
    @Output() remove = new EventEmitter();
    @Output() edit = new EventEmitter();
    @Output() getCheckedVal = new EventEmitter();

    newKey:string = "children";

    ngOnInit() { }

    editNav(event, item) {
        if($(event.target).parent("li").find("ui-tree").find("ul").find("li").length > 0 && !$(event.target).parent("li").hasClass("focused")) {
            // $(event.target).parent("li").addClass("focused");
        }
        else {
            // $(event.target).parent("li").removeClass("focused");
        }
        this.edit.emit(item);
    }

    removeNav(event, item) {
        this.remove.emit(item);
    }

    editSubNav(event, item) {
        this.edit.emit(event);
    }

    removeSubNav(event, item) {
        this.remove.emit(event);
    }

    buildTree(tree, checkVal) {
        tree.checked = checkVal;
        if(tree.children && tree.children.length > 0){
            tree.children.forEach((item) => {
                if(item.children) {
                    this.buildTree(item, checkVal);
                }
            });
        }
    }

    toggleNext(event) {
        if($(event.target).parent().find("ui-tree").find("ul").find("li").length > 0) {
            $(event.target).parent().find("ui-tree").toggle();
            $(event.target).parent().toggleClass("closed");
        }
    }

}
