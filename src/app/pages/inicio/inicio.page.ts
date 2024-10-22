import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  eventos: any[] = [
    {
      nombreEvento: 'Torneo de futbol',
      fecha: '2024-11-01',
      nombrePersona: 'Juan Perez',
      RUT: '12588999-7',
      hora: '7:00 PM'
    },
    {
      nombreEvento: 'Concierto a puertas abiertas',
      fecha: '2024-11-10',
      nombrePersona: 'Maria Lopez',
      RUT: '98765432-1',
      hora: '2:00 PM'
    },
    {
      nombreEvento: 'Expo taller',
      fecha: '2024-11-20',
      nombrePersona: 'Carlos Sanchez',
      RUT: '65432109-3',
      hora: '4:00 PM'
    }
  ];

  qrData: string = '';

  constructor(private menucontroller: MenuController,
              private router: Router,
  ) {}

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
  }
}
