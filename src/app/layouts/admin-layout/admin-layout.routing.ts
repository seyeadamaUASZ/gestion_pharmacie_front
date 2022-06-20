import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ClientsComponent } from 'app/clients/clients.component';
import { MedicamentsComponent } from 'app/medicaments/medicaments.component';
import { AchatsComponent } from 'app/achats/achats.component';
import { CategoriesComponent } from 'app/categories/categories.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'admin/dashboard',      component: DashboardComponent },
    { path: 'admin/user-profile',   component: UserProfileComponent },
    { path: 'admin/table-list',     component: TableListComponent },
    { path: 'admin/typography',     component: TypographyComponent },
    { path: 'admin/icons',          component: IconsComponent },
    { path: 'admin/maps',           component: MapsComponent },
    { path: 'admin/notifications',  component: NotificationsComponent },
    { path: 'admin/upgrade',        component: UpgradeComponent },
    { path:'admin/clients', component:ClientsComponent},
    { path:'admin/medicaments',component:MedicamentsComponent},
    { path: 'admin/achats',component:AchatsComponent},
    { path: 'admin/categories',component:CategoriesComponent}
];
