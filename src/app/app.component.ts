import { Component } from '@angular/core';

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

  ]

  constructor() {}
}
