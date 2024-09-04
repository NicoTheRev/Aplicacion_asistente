import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  nom="";



  constructor(private alertcontroller: AlertController,
              private router:Router,
              ) { }

  ngOnInit() {
  }

  async mostrarMensaje(){
    const alert = await this.alertcontroller.create({
      header: 'Registro correcto',
      cssClass:'alertHeader',
      message: 'Bienvenido '+ this.nom +' !!',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/inicio']);
          },
        },
      ],
    });

    await alert.present();
  }
}
