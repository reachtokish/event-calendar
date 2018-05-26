import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent {

    historyData = [
        {
            type: "Added location",
            valueBefore: "Yelhanka",
            valueAfter: "Hebbal",
            date: "29/01/2018 17:37:09",
            createdBy: "Admin"
        },
        {
            type: "Changed Email",
            valueBefore: "Yelhanka",
            valueAfter: "Hebbal",
            date: "29/01/2018 17:37:09",
            createdBy: "Admin"
        },
        {
            type: "Changed Mobile",
            valueBefore: "Yelhanka",
            valueAfter: "Hebbal",
            date: "29/01/2018 17:37:09",
            createdBy: "Admin"
        },
        {
            type: "Added Amenities",
            valueBefore: "Yelhanka",
            valueAfter: "Hebbal",
            date: "29/01/2018 17:37:09",
            createdBy: "Admin"
        }
    ]

    queryString = "";

}
