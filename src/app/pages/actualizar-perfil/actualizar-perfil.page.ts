import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-actualizar-perfil',
  templateUrl: './actualizar-perfil.page.html',
  styleUrls: ['./actualizar-perfil.page.scss'],
})
export class ActualizarPerfilPage implements OnInit {

  constructor(private menucontroller: MenuController,) { }

  ngOnInit() {
  }
  mostrarMenu(){
    this.menucontroller.open('first');
  }
}
