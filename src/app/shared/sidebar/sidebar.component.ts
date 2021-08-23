import { Component } from '@angular/core';
import { GifService } from '../../gifs/services/gif.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  // GifService: any;

  constructor( private gifService: GifService) { }

  get historial() {
    return this.gifService.historial;
  }
}
