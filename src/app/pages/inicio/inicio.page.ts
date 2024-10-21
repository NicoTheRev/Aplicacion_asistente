import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(
    private menucontroller: MenuController,
  ) { }

  mostrarMenu(){
    this.menucontroller.open('first');
  }
  ngOnInit() {
    this.menucontroller.enable(true);
  }

}
