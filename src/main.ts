import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// Import the correct component, AppComponent
import { App } from './app/app';

// Bootstrap AppComponent, not App
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

