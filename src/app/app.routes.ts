import { Routes } from '@angular/router';

// 1. Import your page components
import { Home } from './pages/home/home'; // Assuming your class is named 'Home'
import { DestinationComponent } from './pages/destination/destination';

// 2. Define the routes in the 'routes' array
export const routes: Routes = [
    // When the URL is empty (e.g., http://localhost:4200), show the Home component
    { path: '', component: Home },

    // When the URL is /destinations, show the DestinationComponent
    { path: 'destinations', component: DestinationComponent },
    
    // (Optional but recommended) Redirect any other URL back to the home page
    { path: '**', redirectTo: '', pathMatch: 'full' }
];