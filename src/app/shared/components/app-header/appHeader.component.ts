import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, ChildActivationStart, RoutesRecognized, ActivationEnd, ChildActivationEnd } from '@angular/router';
import * as $ from 'jquery/dist/jquery.min.js';
import { MatSnackBar } from '@angular/material';
import { SnakBarComponent } from '../../../shared/components/snakbar-component/snakBar.component';

@Component({
    selector: 'app-header',
    templateUrl: './appHeader.component.html',
    styleUrls: ['./appHeader.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppHeaderComponent implements OnInit, AfterViewInit {

    submenu: any[] = [];
    getMainMenu: any[] = [];
    mainMenuTitle: string;
    dropdownMenuTitle: string;
    hasSubmenuBoolean:boolean;
    public userData = JSON.parse(localStorage.getItem("storedData"));

    constructor(private route:ActivatedRoute, private router: Router, public snackBar: MatSnackBar) {

        router.events.subscribe(event => {
            if (event instanceof ChildActivationEnd) {
                if(event.snapshot.data.mainMenu != undefined) {
                    let customData = event.snapshot.data;
                    this.mainMenuTitle = customData.mainMenu;
                    this.dropdownMenuTitle = customData.dropdownMenu;
                    this.hasSubmenuBoolean = customData.hasSubMenu;

                    if(this.hasSubmenuBoolean == false) {
                        this.submenu = [];
                    }
                    else {
                        this.getMainMenu = this.navigation.filter((val) => {
                            return val.name == this.mainMenuTitle;
                        });

                        if(this.getMainMenu.length > 0 && this.getMainMenu[0]["children"] != undefined && this.getMainMenu[0]["children"].length > 0) {
                            this.submenu = this.getMainMenu[0]["children"].filter((val) => {
                                return val.name == this.dropdownMenuTitle;
                            });
                        }
                        else {
                            this.submenu = [];
                        }
                    }
                }
            }
        });

        // this.router.events.subscribe(event => {
        //     if (event instanceof ActivationEnd) {
        //     }
        // });

        // this.mainMenuTitle = route.snapshot.data.mainMenu;
        // this.dropdownMenuTitle = route.snapshot.data.dropdownMenu;

        // this.router.events
        //     .filter((event) => event instanceof NavigationEnd)
        //     .map(() => this.route)
        //     .map((route) => {
        //         while (route.firstChild) route = route.firstChild;
        //         return route;
        //     })
        //     .filter((route) => route.outlet === 'primary')
        //     .mergeMap((route) => route.data)
        //     .subscribe((event) => {
        //         this.mainMenuTitle = event.mainMenu;
        //         this.dropdownMenuTitle = event.dropdownMenu;
        //         this.hasSubmenuBoolean = event.hasSubMenu;
        //
        //         if(this.hasSubmenuBoolean == false) {
        //             this.submenu = [];
        //         }
        //         else {
        //             this.getMainMenu = this.navigation.filter((val) => {
        //                 return val.moduleName == this.mainMenuTitle;
        //             });
        //
        //             if(this.getMainMenu.length > 0 && this.getMainMenu[0]["children"] != undefined && this.getMainMenu[0]["children"].length > 0) {
        //                 this.submenu = this.getMainMenu[0]["children"].filter((val) => {
        //                     return val.moduleName == this.dropdownMenuTitle;
        //                 });
        //             }
        //             else {
        //                 this.submenu = [];
        //             }
        //         }
        //
        //
        //     });

    }

    ngOnInit() {
        $(".main_nav").hover(() => {
            $(".subDropdownMenu").removeClass("hide_dropdown_menu");
        })
        // this.router.events
        //     .subscribe((event) => {
        //         if (event instanceof ChildActivationStart) {
        //
        //             this.mainMenuTitle = event.snapshot.firstChild.data.mainMenu;
        //             this.dropdownMenuTitle = event.snapshot.data.dropdownMenu;
        //
        //             if(event.snapshot.data.hasSubMenu == false) {
        //                 this.submenu = [];
        //             }
        //             else {
        //                 this.getMainMenu = this.navigation.filter((val) => {
        //                     return val.moduleName == this.mainMenuTitle;
        //                 });
        //
        //                 if(this.getMainMenu.length > 0 && this.getMainMenu[0]["children"] != undefined && this.getMainMenu[0]["children"].length > 0) {
        //                     this.submenu = this.getMainMenu[0]["children"].filter((val) => {
        //                         return val.moduleName == this.dropdownMenuTitle;
        //                     });
        //                 }
        //                 else {
        //                     this.submenu = [];
        //                 }
        //             }
        //
        //         }
        //     });
    }

    ngAfterViewInit() {
        this.menuHover();
    }

    menuHover() {
        $(".main_nav > ul > li").on("mouseover", function() {
            if($(this).find("ul").length > 0) {
                $(".header_wrapper").addClass("menu_dropdown_active");
            }
        });
        $(".main_nav > ul > li").on("mouseout", function() {
            // if($(this).find("ul").length > 0) {
                $(".header_wrapper").removeClass("menu_dropdown_active");
            // }
        });
    }

    navigation = JSON.parse(localStorage.getItem("storedData")).navigations;

    public doLogout() {
        localStorage.removeItem("storedData");
        this.router.navigate(['/']);
        this.snackBar.openFromComponent(SnakBarComponent, {
            duration: 1500,
            data: {
                status: "success",
                message: "You have successfully logged out"
            }
        });
    }

}
