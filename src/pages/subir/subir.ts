import { Component } from '@angular/core';
import { ViewController } from "ionic-angular";


@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo:string = "";

  constructor(private ViewCtrl: ViewController) {
  }

cerrar_modal(){
  this.ViewCtrl.dismiss();
}

}
