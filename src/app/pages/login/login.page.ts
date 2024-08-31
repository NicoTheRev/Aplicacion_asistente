import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usu="";



  constructor(private alertcontroller: AlertController,
              private router:Router,
              ) { }

  ngOnInit() {
  }

  async mostrarMensaje(){
    const alert = await this.alertcontroller.create({
      header: 'Confirmación',
      mode: 'ios',
      cssClass:'alertHeader',
      message: 'Bienvenido '+ this.usu +'!!',
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

  async registro(){
    this.router.navigate(['/register'])
  }

}
