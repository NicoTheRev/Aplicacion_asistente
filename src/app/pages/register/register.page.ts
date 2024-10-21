import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserNuevo } from 'src/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  nom="";

  registroForm: FormGroup;

  nuevoUsuario: UserNuevo={
    username:"",
    password:"",
    email:"",
    nombre:"",
    apellidos:"",
    rut:"",
    isactive:false
  }

  selectedFile: File | null = null;
  uploadedImage: string | null = null;

  userdata: any;

  constructor(private authservice: AuthService, 
    private alertcontroller: AlertController,
    private router: Router,
    private fBuilder: FormBuilder) {
      this.registroForm = this.fBuilder.group({ 
      'username' : new FormControl ("", [Validators.required, Validators.minLength(6)]),
      'email': new FormControl ("", [Validators.required, Validators.email]),
      'password': new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
      'nombre': new FormControl("", [Validators.required, Validators.minLength(3)]),
      'apellidos': new FormControl("", [Validators.required, Validators.minLength(4)]),
      'rut': new FormControl("", [Validators.required, Validators.minLength(8)]),
    })
}

  ngOnInit() {
  }

  // async mostrarMensaje(){
  //   const alert = await this.alertcontroller.create({
  //     header: 'Registro correcto',
  //     cssClass:'alertHeader',
  //     message: 'Bienvenido '+ this.nom +' !!',
  //     buttons: [
  //       {
  //         text: 'OK',
  //         role: 'confirm',
  //         handler: () => {
  //           this.router.navigate(['/inicio']);
  //         },
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async errorDuplicidad(){
    const alerta = await this.alertcontroller.create({
      header: 'Error..',
      message: 'Usted '+ this.nuevoUsuario.username + ' ya esta registrado:D',
      buttons: ['OK']
    });
    alerta.present();
  }

  async mostrarMensaje(){
    const alerta = await this.alertcontroller.create({
      header: 'Usuario creado',
      message: 'Bienvenid@! ' + this.nuevoUsuario.username,
      buttons: ['OK']
    });
    alerta.present();
  }

  crearUsuario(){
    if (this.registroForm.valid){
      this.authservice.GetUserByUsername(this.registroForm.value.username).subscribe(resp=>{
        this.userdata = resp; 
        if(this.userdata.length>0){
           this.registroForm.reset();
          this.errorDuplicidad();
        }
        else{
          this.nuevoUsuario.username = this.registroForm.value.username;
          this.nuevoUsuario.password = this.registroForm.value.password;
          this.nuevoUsuario.email = this.registroForm.value.email;
          this.nuevoUsuario.nombre = this.registroForm.value.nombre;
          this.nuevoUsuario.apellidos = this.registroForm.value.apellidos;
          this.nuevoUsuario.rut = this.registroForm.value.rut;
          this.nuevoUsuario.isactive=true;
          this.authservice.PostUsuario(this.nuevoUsuario).subscribe();
          this.registroForm.reset();
          this.mostrarMensaje();
          this.router.navigateByUrl('/inicio');
        }
      })
    }
  }
}
