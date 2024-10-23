import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { autorizadoGuard } from './guards/autorizado.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [autorizadoGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [autorizadoGuard]
  },
  {
    path: 'actividades',
    loadChildren: () => import('./pages/actividades/actividades.module').then( m => m.ActividadesPageModule),
    canActivate: [autorizadoGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [autorizadoGuard]
  },
  {
    path: 'actualizar-perfil/:id',
    loadChildren: () => import('./pages/actualizar-perfil/actualizar-perfil.module').then( m => m.ActualizarPerfilPageModule),
    canActivate: [autorizadoGuard]
  },
  {
    path: 'comentarios',
    loadChildren: () => import('./pages/comentarios/comentarios.module').then( m => m.ComentariosPageModule),
    canActivate: [autorizadoGuard]
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
