import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SubirPage } from "../subir/subir";

//Servicios
import {CargaArchivosService} from "../../providers/carga-archivos/carga-archivos";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(private modalCtrl: ModalController,
              private _car: CargaArchivosService) {

                this._car.cargar_imagenes();
  }

  mostrar_modal(){
    let modal = this.modalCtrl.create(SubirPage);
    modal.present();
  }

}
