import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApicrudService } from 'src/app/services/apicrud.service';
import { misEventos } from 'src/interfaces/misEventos';


@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})


export class ActividadesPage implements OnInit {
  usuario : any;
  perfil = {
    id:"",
    username:"",
    nombre:"",
    apellidos:"",
    email:"",
    password:"",
    rut:"",
    correo:"",
  }

  eventos: misEventos[]=[];



  constructor(private router:Router,
              private menucontroller: MenuController,
              private apicrud: ApicrudService,
              ) { }

  ngOnInit() {
    this.menucontroller.enable(true);
    this.getUsuario(); 
  }

  // funcion para retornar los datos del usuario
  getUsuario() {
    this.apicrud.getUser().subscribe((user) => { 
      this.usuario=user;
      this.perfil=this.usuario;
      this.getEventos(this.perfil.username); 
  })
  }

  // funcion para retornar los datos de los eventos que tenga la persona
  getEventos(username: any) {
    this.apicrud.getMisEventos(username).subscribe((data) => {
      this.eventos = data
    })
  }

  linkToEvento(evento:any){
    this.router.navigate(['actividades/evento', evento],
      {queryParams:{evento: JSON.stringify(evento)}}
    )
  }
  mostrarMenu(){
    this.menucontroller.open('first');  //invoca a menuId de app.component.html
  }
}
