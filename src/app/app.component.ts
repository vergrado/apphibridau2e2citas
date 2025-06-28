import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,                // root standalone
  imports: [IonicModule, RouterModule],
  template: `<ion-app><router-outlet></router-outlet></ion-app>`
})
export class AppComponent {}
