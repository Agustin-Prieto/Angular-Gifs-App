import { ElementRef } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { GifService } from '../services/gif.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor( private gifService: GifService ) {}

  buscar(){
    const valor = this.txtBuscar.nativeElement.value;

    if( valor.trim().length === 0){
      return;
    }

    this.gifService.buscarGifs( valor );
    this.txtBuscar.nativeElement.value = '';
  }

}
