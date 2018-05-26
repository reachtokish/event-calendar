import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, ChildActivationStart, RoutesRecognized, ActivationStart, NavigationStart, ActivationEnd, ChildActivationEnd } from '@angular/router';
import * as $ from 'jquery/dist/jquery.min.js';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	hasSubMenu;
    public isLoggedIn:boolean = false;
    private navigation;
    public hasSubmenu:boolean = false;

    constructor(private route:ActivatedRoute, private router: Router, private titleService: Title) {

        // this.router.events
        //     .subscribe((event) => {
        //         if (event instanceof ChildActivationStart) {
        //             this.hasSubMenu = event.snapshot.firstChild.data.hasSubMenu;
        //         }
        //         if(localStorage.getItem("storedData") && localStorage.getItem("storedData") != "") {
        //             this.isLoggedIn = true;
        //         }
        //         else {
        //             this.isLoggedIn = false;
        //         }
		//
        //     });

		// router.events.subscribe(event => {
		// 	if (event instanceof ChildActivationEnd) {
		// 		if(event.snapshot.data.title != undefined) {
		// 			this.titleService.setTitle(event.snapshot.data.title);
		// 		}
        //         if(event.snapshot.data.mainMenu != undefined) {
		// 			let customData = event.snapshot.data;
		// 	        if(localStorage.getItem("storedData") != undefined && localStorage.getItem("storedData") != '') {
	    //                 this.navigation = JSON.parse(localStorage.getItem("storedData"));
	    //                 if(customData.hasSubMenu == true) {
	    //                     let getFirstLevelMenuCons = this.navigation.navigations.filter((obj) => {
	    //                         return obj.name == customData.mainMenu;
	    //                     })
	    //                     if(getFirstLevelMenuCons[0].children.length > 0) {
	    //                         let getSecondLevelMenuCons = getFirstLevelMenuCons[0].children.filter((obj) => {
	    //                             return obj.name == customData.dropdownMenu;
	    //                         })
	    //                         if(getSecondLevelMenuCons.length > 0) {
	    //                             if(getSecondLevelMenuCons[0].children.length > 0) {
	    //                                 this.hasSubmenu = true;
	    //                             }
	    //                             else {
	    //                                 this.hasSubmenu = false;
	    //                             }
	    //                         }
	    //                         else {
	    //                             this.hasSubmenu = false;
	    //                         }
	    //                     }
	    //                     else {
	    //                         this.hasSubmenu = false;
	    //                     }
	    //                 }
	    //                 else {
	    //                     this.hasSubmenu = false;
	    //                 }
	    //             }
	    //             else {
	    //                 this.hasSubmenu = false;
	    //             }
		// 		}
		// 	}

			// if(event instanceof NavigationEnd) {
			// 	if(event.url == "/login") {
			// 		setTimeout(() => {
			// 			this.hasSubmenu = false;
			// 		}, 100);
			// 	}
			// }

		// });

        // this.router.events
        //     .filter(event => event instanceof RoutesRecognized)
        //     .map( (event: RoutesRecognized) => {
        //         return event.state.root.children[0].children[0].data;
        //     })
        //     .subscribe(customData => {
        //         if(localStorage.getItem("storedData") != undefined && localStorage.getItem("storedData") != '') {
        //             this.navigation = JSON.parse(localStorage.getItem("storedData"));
        //             if(customData.hasSubMenu == true) {
        //                 let getFirstLevelMenuCons = this.navigation.navigations.filter((obj) => {
        //                     return obj.moduleName == customData.mainMenu;
        //                 })
        //                 if(getFirstLevelMenuCons[0].children.length > 0) {
        //                     let getSecondLevelMenuCons = getFirstLevelMenuCons[0].children.filter((obj) => {
        //                         return obj.moduleName == customData.dropdownMenu;
        //                     })
        //                     if(getSecondLevelMenuCons.length > 0) {
        //                         if(getSecondLevelMenuCons[0].children.length > 0) {
        //                             this.hasSubmenu = true;
        //                         }
        //                         else {
        //                             this.hasSubmenu = false;
        //                         }
        //                     }
        //                     else {
        //                         this.hasSubmenu = false;
        //                     }
        //                 }
        //                 else {
        //                     this.hasSubmenu = false;
        //                 }
        //             }
        //             else {
        //                 this.hasSubmenu = false;
        //             }
        //         }
        //         else {
        //             this.hasSubmenu = false;
        //         }
        //     })


    }

    ngOnInit() {
		// this.router.events.subscribe((evt) => {
		// 	if (evt instanceof NavigationStart) {
		// 		if(evt.url == "/" || evt.url == "/login") {
		// 			if(localStorage.getItem("storedData") != undefined && localStorage.getItem("storedData") != '') {
		// 	            this.router.navigate(['/create-franchise']);
		// 	        }
		// 	        else {
		// 	            localStorage.removeItem("storedData");
		// 	        }
		// 		}
        //     }
        //     if (!(evt instanceof NavigationEnd)) {
        //         return;
        //     }
        //     window.scrollTo(0, 0);
        //     $(".subDropdownMenu").addClass("hide_dropdown_menu");
		//
        // });

        // this.router.events.subscribe((evt) => {
        //     if (!(evt instanceof NavigationEnd)) {
        //         return;
        //     }
        //     window.scrollTo(0, 0);
        //     $(".subDropdownMenu").addClass("hide_dropdown_menu");
        // });

        // this.router.events
        //     .filter(event => event instanceof RoutesRecognized)
        //     .map( (event: RoutesRecognized) => {
        //         return event.state.root.children[0].children[0].data;
        //     })
        //     .subscribe(customData => {
        //         if(localStorage.getItem("storedData") != undefined && localStorage.getItem("storedData") != '') {
        //             this.navigation = JSON.parse(localStorage.getItem("storedData"));
        //             if(customData.hasSubMenu == true) {
        //                 let getFirstLevelMenuCons = this.navigation.navigations.filter((obj) => {
        //                     return obj.moduleName == customData.mainMenu;
        //                 })
        //                 if(getFirstLevelMenuCons[0].children.length > 0) {
        //                     let getSecondLevelMenuCons = getFirstLevelMenuCons[0].children.filter((obj) => {
        //                         return obj.moduleName == customData.dropdownMenu;
        //                     })
        //                     if(getSecondLevelMenuCons.length > 0) {
        //                         if(getSecondLevelMenuCons[0].children.length > 0) {
        //                             this.hasSubmenu = true;
        //                         }
        //                         else {
        //                             this.hasSubmenu = false;
        //                         }
        //                     }
        //                     else {
        //                         this.hasSubmenu = false;
        //                     }
        //                 }
        //                 else {
        //                     this.hasSubmenu = false;
        //                 }
        //             }
        //             else {
        //                 this.hasSubmenu = false;
        //             }
        //         }
        //         else {
        //             this.hasSubmenu = false;
        //         }
        //     })


        // this.router.events
        //     .subscribe((event) => {
        //         if (event instanceof ChildActivationStart) {
        //             this.hasSubMenu = event.snapshot.firstChild.data.hasSubMenu;
        //         }
        //         if(localStorage.getItem("storedData") && localStorage.getItem("storedData") != "") {
        //             this.isLoggedIn = true;
        //         }
        //         else {
        //             this.isLoggedIn = false;
        //         }
        //     });
    }

}
