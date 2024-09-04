import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {

  constructor(private router:Router,
              ) { }

  ngOnInit() {
  }

  async linkToEvento(){
    this.router.navigate(['actividades/evento'])
  }
}
