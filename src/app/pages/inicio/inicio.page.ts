import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApicrudService } from 'src/app/services/apicrud.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
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
  eventos: any[] = [];
  qrData: string = '';
  miEvento = {
    src:"",
    nombreEvento:"",
    fechaEvento:"",
    hora:"",
    username:"",
    nombre:"",
    apellidos:"",
    rut:"",
    correo:"",
  }

  constructor(private menucontroller: MenuController,
              private router: Router,private http: HttpClient,private apicrud: ApicrudService,private alertcontroller: AlertController
  ) {}

  cargarEventos() {
    this.http.get<any[]>('http://localhost:3000/eventos') // Cambiar a la URL del json-server
      .subscribe(data => {
        this.eventos = data;
      }, error => {
        console.error('Error al cargar los eventos desde la API', error);
      });
  }

  generarQR(evento: any) {
    const idCorto = evento.RUT.substring(0, 8);  // Obtener los primeros 8 dígitos del RUT
    this.qrData = `Evento: ${evento.nombreEvento}, Fecha: ${evento.fecha}, Hora: ${evento.hora}, Nombre: ${evento.nombrePersona}, RUT: ${idCorto}`;
  }
  
  comentarios(evento: any) {
    this.router.navigate(['/comentarios', evento],
      {queryParams:{evento: JSON.stringify(evento)}}
    )
  }

  mostrarMenu(){
    this.menucontroller.open('first');
  }
  ngOnInit() {
    this.menucontroller.enable(true);
    this.cargarEventos(); // Cargar los eventos al iniciar
    this.getUsuario(); 
  }

  getUsuario() {
    this.apicrud.getUser().subscribe((data) => { 
      this.usuario=data;
      this.perfil=this.usuario;
  })
  }

  guardarEvento(evento: any) {
    this.miEvento.src = `${evento.src}`
    this.miEvento.nombreEvento = `${evento.nombreEvento}`
    this.miEvento.fechaEvento = `${evento.fecha}`
    this.miEvento.hora = `${evento.hora}`
    this.miEvento.username = this.perfil.username
    this.miEvento.nombre = this.perfil.nombre
    this.miEvento.apellidos = this.perfil.apellidos
    this.miEvento.correo = this.perfil.email
    const idCorto = this.perfil.rut.substring(0, 8);
    this.miEvento.rut = idCorto
    this.apicrud.putMisEventos(this.miEvento).subscribe();
    this.mostrarMensaje();
  }

  async mostrarMensaje(){
    const alerta = await this.alertcontroller.create({
      header: 'Registro evento',
      message: 'Evento registrado con exito!',
      buttons: ['OK']
    });
    alerta.present();
  }
}
