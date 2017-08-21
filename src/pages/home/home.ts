import { Component } from '@angular/core';
import { ModalController, ToastController } from 'ionic-angular';
import { SubirPage } from "../subir/subir";

//Servicios
import {CargaArchivosService} from "../../providers/carga-archivos/carga-archivos";
import { AuthService } from '../../providers/auth-service/auth-service';

//Plugins
import { SocialSharing } from '@ionic-native/social-sharing';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hayMas:boolean = true;

  constructor(private modalCtrl: ModalController,
              private _car: CargaArchivosService,
              private _auth: AuthService,
              private socialSharing: SocialSharing,
              private toastCtrl:ToastController) {

                this._car.cargar_imagenes();
  }


  salir(){
    this._auth.signOut();
  }

  ingresar(): void {
  this._auth.signInWithFacebook()
    .then(() => this.onSignInSuccess());
}

compartir(post:any){
      // Check if sharing via email is supported
    this.socialSharing.shareViaFacebook(post.titulo, post.img).then(() => {
      // Sharing via email is possible
      this.toastCtrl.create({
        message: "Compartido correctamente",
        duration:2500

      }).present();

    }).catch((error) => {
      // Sharing via email is not possible
      this.toastCtrl.create({
        message: error,
        duration:2500

      }).present();
    });
}

private onSignInSuccess(): void {
  console.log("Facebook nombre ",this._auth.displayName());
}

  cargar_siguientes(infiniteScroll:any){
    console.log("Siguientes...")
    this._car.cargar_imagenes()
      .then(
        (existenMas:boolean)=> {
          infiniteScroll.complete();
          console.log(existenMas);
          this.hayMas = existenMas;
        }
      )
  }

  mostrar_modal(){
    let modal = this.modalCtrl.create(SubirPage);
    modal.present();
  }

}
