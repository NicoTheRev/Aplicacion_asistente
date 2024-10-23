import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage implements OnInit {
  isModalOpen = false;

  evento:any;
  qrData: string = '';

  constructor(private menucontroller: MenuController, private activated: ActivatedRoute) {
    this.activated.queryParams.subscribe(param => { 
      this.evento = JSON.parse(param ['evento']);
    })
  }

  mostrarMenu(){
    this.menucontroller.open('first');
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  ngOnInit() {
    this.menucontroller.enable(true);
    this.generarQR(this.evento)
  }

  async generarQR(evento: any) {
    const idCorto = evento.rut.substring(0, 8);  // Obtener los primeros 8 dígitos del RUT
    this.qrData = `Evento: ${evento.nombreEvento}, Fecha: ${evento.fechaEvento}, Hora: ${evento.hora}, Nombre: ${evento.nombre}, Apellido: ${evento.apellidos}, RUT: ${idCorto}, Correo: ${evento.correo}`;
  }
}
