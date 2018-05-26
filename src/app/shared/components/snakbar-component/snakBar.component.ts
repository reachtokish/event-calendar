import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'stack-bar',
  templateUrl: './snakBar.component.html',
  styleUrls: ['./snakBar.component.scss']
})

export class SnakBarComponent {

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

}
