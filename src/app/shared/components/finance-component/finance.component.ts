import { Component } from '@angular/core';

@Component({
  selector: 'finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})

export class FinanceComponent {

    constructor() { }

    val="Add Payment";
    val2="Add Payment";
    showHide;
    showHide2;
    changeText(text){
        this.val=text;
        this.showHide=false;
    }
    changeText2(text){
        this.val2=text;
        this.showHide2=false;
    }

}
