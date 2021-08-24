import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private _historial: string[] = [];
  private apiKey: string = 'CwYRmyeGmrvBILuZDWPGxsrup1D1GLfv';
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {}

  buscarGifs( query: string){
    query = query.trim().toLowerCase();

    if( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
    }    
    
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=CwYRmyeGmrvBILuZDWPGxsrup1D1GLfv&q=${ query }&limit=10`)
      .subscribe( ( resp ) => {
        console.log( resp.data );
        this.resultados = resp.data;
      });
  }
}
