import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BbddService } from '../share/bbdd.service';

@Component({
  selector: 'app-crear-comentario',
  templateUrl: './crear-comentario.page.html',
  styleUrls: ['./crear-comentario.page.scss'],
})
export class CrearComentarioPage implements OnInit {

  nick:string;
  comentario:string;
  constructor(private route:Router, private rutaActiva:ActivatedRoute, private bbdd:BbddService) { 
    this.rutaActiva.queryParamMap.subscribe(()=>{
      this.nick=this.route.getCurrentNavigation().extras.state.name;
    }) 
  }

  ngOnInit() {
  }

  getLogin() {


    // let nick = this.inicioSesionService.sayTheField("nick");

    this.bbdd.crearComentario(this.nick,this.comentario).then((data) => {
      // console.log(data);
      // if(data[0].logeo===1){
      //   this.bandera = true;
      // }
    }).catch((e) => { alert(e) });
    
  }

}
