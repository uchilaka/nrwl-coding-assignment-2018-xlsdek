import { Routes} from '@angular/router';

export const appRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'tickets'
            },
            {
                path: 'tickets',
                loadChildren: './feature-tickets/feature-tickets.module#FeatureTicketsModule'
            }
        ]
    }
];