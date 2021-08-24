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

  constructor( private http: HttpClient ) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs( query: string){
    query = query.trim().toLowerCase();

    let apiLink: string = `https://api.giphy.com/v1/gifs/search?api_key=CwYRmyeGmrvBILuZDWPGxsrup1D1GLfv&q=${ query }&limit=10`;
    
    if( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
      // localStorage.setItem('resultados', JSON.stringify(this.))
    }    
    
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=CwYRmyeGmrvBILuZDWPGxsrup1D1GLfv&q=${ query }&limit=10`)
      .subscribe( ( resp ) => {
        console.log( resp.data );
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
