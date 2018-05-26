import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { AuthGuard } from './services/authGuard.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/create-calendar',
        pathMatch: "full",
        data: {
            title: "Manage Events",
            hasSubMenu: false
        }
    },
    {
        path: '',
        component: AuthLayoutComponent,
        data: {
            hasSubMenu: false
        },
        children: [
            {
				path: 'create-calendar',
				loadChildren: 'app/modules/calendar/create-calendar/createCalendar.module#CreateCalendarModule',
				data: {
                    title: "Manage Calendar - Raine & Horne",
                    hasSubMenu: true,
					mainMenu: "Work",
					dropdownMenu: "Calendar"
				}
			}
        ]
    },
    // {
    //     path: '',
    //     component: DashboardLayoutComponent,
    //     data: {
    //         hasSubMenu: false
    //     },
    //     canActivate: [AuthGuard],
    //     children: [
    //         {
	// 			path: 'create-calendar',
	// 			loadChildren: 'app/modules/calendar/create-calendar/createCalendar.module#CreateCalendarModule',
	// 			data: {
    //                 title: "Manage Calendar - Raine & Horne",
    //                 hasSubMenu: true,
	// 				mainMenu: "Work",
	// 				dropdownMenu: "Calendar"
	// 			}
	// 		},
    //         {
	// 			path: '**',
	// 			loadChildren: 'app/modules/404/404/404.module#FourOFourModule',
	// 			data: {
    //                 title: "Not Found - Raine & Horne",
    //                 hasSubMenu: false
	// 			}
 	// 		}
    //     ]
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
