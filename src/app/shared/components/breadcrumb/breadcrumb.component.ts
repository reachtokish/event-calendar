import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})

export class BreadcrumbComponent implements OnInit {

    @Input() breadCrumbData : string;

    ngOnInit() { }

}
