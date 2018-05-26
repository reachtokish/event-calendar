import { Component } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
    selector: 'interaction',
    templateUrl: './interaction.component.html',
    styleUrls: ['./interaction.component.scss']
})

export class InteractionComponent {

    // interaction datas
    interactions = [
        {
            category: "Site Visit",
            leadName: "Praveen Kumar",
            notes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since",
            createdDate: new Date(),
            agent: "Ashwin Kumar",
            icon: "sitevisit_ico.svg"
        },
        {
            category: "Meeting",
            leadName: "Praveen Kumar",
            notes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since",
            createdDate: new Date(),
            agent: "Ashwin Kumar",
            icon: "meeting_ico.svg"
        },
        {
            category: "Call",
            leadName: "Praveen Kumar",
            notes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since",
            createdDate: new Date(),
            agent: "Ashwin Kumar",
            icon: "call_ico.svg"
        },
        {
            category: "Email",
            leadName: "Praveen Kumar",
            notes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since",
            createdDate: new Date(),
            agent: "Ashwin Kumar",
            icon: "email_ico.svg"
        },
        {
            category: "SMS",
            leadName: "Praveen Kumar",
            notes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since",
            createdDate: new Date(),
            agent: "Ashwin Kumar",
            icon: "sms_ico.svg"
        }
    ]

    interaction = {
        site_visit: {
            category: "Site Visit",
            leadName: "Praveen Kumar",
            listing: "Listing 1",
            createdDate: "",
            status: "",
            agent: "",
            notes: "",
            icon: "sitevisit_ico.svg"
        },
        meeting: {
            category: "Meeting",
            leadName: "Praveen Kumar",
            listing: "Listing 1",
            createdDate: "",
            status: "",
            agent: "Pawan Kumar",
            notes: "",
            icon: "meeting_ico.svg",
            location: ""
        },
        call: {
            category: "Call",
            leadName: "Praveen Kumar",
            listing: "Listing 1",
            createdDate: "",
            status: "",
            agent: "Pawan Kumar",
            notes: "",
            icon: "call_ico.svg",
            phone: "",
            type: ""
        },
        email: {
            category: "Email",
            leadName: "Praveen Kumar",
            listing: "Listing 1",
            createdDate: "",
            status: "",
            agent: "Pawan Kumar",
            notes: "",
            icon: "email_ico.svg",
            phone: "",
            type: ""
        },
        sms: {
            category: "SMS",
            leadName: "Praveen Kumar",
            listing: "Listing 1",
            createdDate: "",
            status: "",
            agent: "Pawan Kumar",
            notes: "",
            icon: "sms_ico.svg",
            phone: "",
            type: ""
        }
    }

    constructor() { }

    selectedIndex: number = 0;
    changeTab(event, id: number, elemClass: string) {
        this.selectedIndex = id;
        if(id == 0) {
            $('.'+elemClass).find("button").removeClass("interaction_btn_active");
        }
        if(id != 0) {
            $(event.target).parent().find("button").removeClass("interaction_btn_active");
            $(event.target).addClass("interaction_btn_active");
        }
    }

    addInteraction(objNode: string) {
        this.interactions.push(this.interaction[objNode]);
        this.selectedIndex = 0;
    }

}
