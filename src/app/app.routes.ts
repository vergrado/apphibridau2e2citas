// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./paginas/inicio/inicio.page').then(m => m.InicioPage) },
  { path: 'gestion', loadComponent: () => import('./paginas/gestion/gestion.page').then(m => m.GestionPage) },
  { path: 'configuracion', loadComponent: () => import('./paginas/configuracion/configuracion.page').then(m => m.ConfiguracionPage) },
];

  
// ruta configuración
//];
// app.routes.ts



//import { Routes } from '@angular/router';

//export const routes: Routes = [
//  {
 ///   path: 'home',
    //loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
//  },
 // {
   // path: '',
   // redirectTo: 'home',
   // pathMatch: 'full',
 // },
 // {
   // path: 'inicio',
   // loadComponent: () => import('./paginas/inicio/inicio.page').then( m => m.InicioPage)
  //},
//];
