import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DestinationComponent } from './pages/destination/destination';
import { BookingPageComponent } from './pages/booking-page/booking-page';
import { ContactPageComponent } from './pages/contact-page/contact-page';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'destinations', component: DestinationComponent },

    // Route for when a destination is pre-selected
    { path: 'booking/:id', component: BookingPageComponent }, 

    // Route for when user selects a destination manually
    { path: 'booking', component: BookingPageComponent },

    { path: 'contact', component: ContactPageComponent },

    // This is a wildcard route to catch any unknown URLs
    { path: '**', redirectTo: '', pathMatch: 'full' }
];