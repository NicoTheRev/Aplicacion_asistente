import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  eventos: any[] = [];
  qrData: string = '';

  constructor(private menucontroller: MenuController,
              private router: Router,private http: HttpClient
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
  }
}
