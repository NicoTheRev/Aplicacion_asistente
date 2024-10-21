import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApicrudService } from 'src/app/services/apicrud.service';
import { Router } from '@angular/router';
import { User, Users } from 'src/interfaces/users'; 
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario : any;

  perfil = {
    id:"",
    username:"",
    nombre:"",
    apellidos:"",
    email:"",
    password:"",
  }

 


  constructor(
              private menucontroller: MenuController,
              private apicrud: ApicrudService,
              private router: Router,
              private activated: ActivatedRoute,
              private alert: AlertController
            ) {
            //   this.apicrud.getUsers().subscribe((data) => { 
            //     this.usuario=data;
            //     console.log(data)
            // })
            }


  mostrarMenu(){
    this.menucontroller.open('first');
  }


  ngOnInit() {
    this.getUsuario()
  }

  getUsuario() {
    this.apicrud.getUser().subscribe((data) => { 
      this.usuario=data;
      this.perfil=this.usuario;
      console.log(this.perfil)
  })
  }

  async actualizar(){
    const alert = await this.alert.create({
      header: 'Actualización',
      mode:'ios',
      message: 'Necesita actualizar la información?',
      buttons: [
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.actualizarPerfil();
          },
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/tabs/tab1']);
          },
        },
      ],
    });
      await alert.present();
  }//finmetodo

  actualizarPerfil(){
    this.apicrud.putUser(this.perfil).subscribe();
  }


  

  

}
