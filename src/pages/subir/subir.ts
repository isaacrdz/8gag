import { Component } from '@angular/core';
import { ViewController, ToastController, Platform } from "ionic-angular";

//Plugins
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';



@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo:string = "";
  imgPreview:string = null;
  img:string = null;

  constructor(private ViewCtrl: ViewController,
              private toastCtrl: ToastController,
              private platform: Platform,
              private camera: Camera,
              private imagePicker: ImagePicker) {
  }

cerrar_modal(){
  this.ViewCtrl.dismiss();
}

mostrar_camara(){

  if(!this.platform.is("cordova")){
    this.mostrar_toast("Error: No estamos en un celular");
    return;
  }
  const options: CameraOptions = {
  quality: 40,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE,
  correctOrientation: true
}

this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.imgPreview = 'data:image/jpeg;base64,' + imageData;
     this.img = imageData;


    }, (err) => {
     // Handle error
     this.mostrar_toast("Error " + err);
     console.error("Error en la camara: ", err);
    });
}

seleccionar_fotos(){

  if(!this.platform.is("cordova")){
    this.mostrar_toast("Error: No estamos en un celular");
    return;
  }

  let options:ImagePickerOptions = {
    maximumImagesCount:1,
    quality:40,
    outputType:1
  }

  this.imagePicker.getPictures(options).then((results) => {

    for(let img of results){
      this.imgPreview = 'data:image/jpeg;base64,' + img;
      this.img = img;
      break;
    }


}, (err) => {
  this.mostrar_toast("Error seleccion: " + err);
  console.error("Error en la seleccion" + JSON.stringify(err))
});

}

private mostrar_toast(texto: string){
  this.toastCtrl.create({
    message: texto,
    duration:2500

  }).present();
}

}
