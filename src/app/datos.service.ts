import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
nick:string;
  constructor() { }

  setNick(nick:string){
    this.nick=nick;
  }

  getNick(){
    return this.nick;
  }
}
