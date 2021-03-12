import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from '../datos.service';
import { BbddService } from '../share/bbdd.service';

@Component({
  selector: 'app-lista-amigos',
  templateUrl: './lista-amigos.page.html',
  styleUrls: ['./lista-amigos.page.scss'],
})
export class ListaAmigosPage implements OnInit {
  amigos:Array<any>=[];
  nick:string;
  constructor(private bbdd:BbddService,private route:Router, private rutaActiva:ActivatedRoute, private datos:DatosService) { 
    //console.log(this.rutaActiva.queryParams)
    // this.rutaActiva.queryParamMap.subscribe(()=>{
    //   this.nick=this.route.getCurrentNavigation().extras.state.name;
    // })  
    this.nick=this.datos.getNick();
    console.log(this.nick)
    this.mostrarAmigos(); 
  }

  ngOnInit() {
  }

  // mostrarAmigos(){
  //   this.bbdd.mostrarAmigos(this.nick).then((data) => {
  //     console.log(data);
  //     for (let index = 0; index < data.length; index++) {
  //       this.amigos[index]=data[index].mostrar;
  //     }
  //   }).catch((e) => { alert(e) });
  // }

  async mostrarAmigos(){
    await this.bbdd.mostrarAmigos(this.nick).then((data) => {
      console.log(data);
      for (let index = 0; index < data.length; index++) {
        this.amigos[index]=data[index]
      }
    }).catch((e) => { alert(e) });
  }

  eliminarAmigos(nickAmigo){
    this.bbdd.eliminarAmigo(this.nick,nickAmigo).then().catch();
    this.bbdd.eliminarAmigoDos(this.nick,nickAmigo).then().catch();
  }


}
