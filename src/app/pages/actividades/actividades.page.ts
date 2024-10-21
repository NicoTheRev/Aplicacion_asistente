import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {

  constructor(private router:Router,
              private menucontroller: MenuController,
              ) { }

  ngOnInit() {
  }

  async linkToEvento(){
    this.router.navigate(['actividades/evento'])
  }
  mostrarMenu(){
    this.menucontroller.open('first');  //invoca a menuId de app.component.html
  }
}
