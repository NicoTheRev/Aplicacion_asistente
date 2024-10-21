import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
register();

interface Opciones{
  icon:string;
  name:string;
  redirecTo:string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  opciones: Opciones[] =[
    {
      icon:'person',
      name: 'Perfil',
      redirecTo:'/perfil'
    },
    {
      icon:'home',
      name: 'Inicio',
      redirecTo:'/inicio'
    },
    {
      icon:'calendar',
      name: 'Actividades',
      redirecTo:'/actividades'
    },
    {
      icon:'log-out',
      name: 'Log Out',
      redirecTo:'/login',
    },

  ]

  constructor(private authService: AuthService, private router: Router,private menucontroller: MenuController) {}

  logout(): void {
    this.authService.logOut();
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
    this.menucontroller.enable(false);
    this.menucontroller.close('first');
  }
}
