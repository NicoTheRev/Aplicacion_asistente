import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApicrudService } from 'src/app/services/apicrud.service';
import { Comentario } from 'src/interfaces/comentarios';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
usuario : any;
perfil = {
  id:"",
  username:"",
  nombre:"",
  apellidos:"",
  email:"",
  password:"",
}

evento: any;
comentarios: Comentario[] = []
coment = {
  nombreEvento:"",
  usuario:"",
  comentario:""
}
inputComentario: string = '';

  constructor(private activated: ActivatedRoute,private apicrud: ApicrudService, private router: Router,private menucontroller: MenuController) {
    this.activated.queryParams.subscribe(param => { 
      this.evento = JSON.parse(param ['evento']);
    })
  }

  mostrarMenu(){
    this.menucontroller.open('first');
  }
  ngOnInit() {
    this.menucontroller.enable(true);
    this.getUsuario()
    this.getComentarios()
  }

  getUsuario() {
    this.apicrud.getUser().subscribe((data) => { 
      this.usuario=data;
      this.perfil=this.usuario;
  })
  }
  getComentarios() {
    this.apicrud.getComentarios(this.evento.nombreEvento).subscribe((com) => {
      this.comentarios = com;
      console.log(this.comentarios)
    } )
  }

  postComentario() {
    this.coment.nombreEvento = this.evento.nombreEvento
    this.coment.usuario = this.perfil.username
    this.coment.comentario = this.inputComentario
    this.apicrud.putComentario(this.coment).subscribe();
    this.inputComentario = ""
  }
}
