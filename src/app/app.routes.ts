import { Routes } from '@angular/router';
import {HomeComponent} from "./page/home/home.component";
import {ContactComponent} from "./page/contact/contact.component";

export const routes: Routes = [
  {
    title: 'Home',
    path: 'home',
    component: HomeComponent,
  },
  {
    title: 'Contact',
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  }
];
