import { Component } from '@angular/core';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ToastController, Platform } from 'ionic-angular';

import {HistorialProvider} from "../../providers/historial/historial";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner,
              private toastCtrl: ToastController,
              private platform:Platform,
              private _historialProvider: HistorialProvider) {


  }

  scan(){

    console.log("realizando Scan....")

    if (!this.platform.is('cordova')) {
        //this._historialProvider.agregar_historial("http://google.com");
        //this._historialProvider.agregar_historial("geo:51.678418,7.809007");
        /*this._historialProvider.agregar_historial( `BEGIN:VCARD
VERSION:2.1
N:Kent;Clark
FN:Clark Kent
ORG:
TEL;HOME;VOICE:12345
TEL;TYPE=cell:67890
ADR;TYPE=work:;;;
EMAIL:clark@superman.com
END:VCARD` );*/
        this._historialProvider.agregar_historial("MATMSG:TO:contacto@damkt.com;SUB:Hola mundo desde compu!!;BODY:Terminando Tarea2 en compu!!! ;;");
        return;
    }

    this.barcodeScanner.scan().then((barcodeData) => {
       // Success! Barcode data is here
       console.log("result:", barcodeData.text);
       console.log("format:", barcodeData.format);
       console.log("cancelled:", barcodeData.cancelled);

       if (barcodeData.cancelled == false  && barcodeData.text != null) {
           this._historialProvider.agregar_historial(barcodeData.text);
       }
     }, (err) => {
          // An error occurred
          console.error("Error: ", err);
          this.mostrar_error("Error: " + err);
      });
  }

  mostrar_error(mensaje:string){
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
