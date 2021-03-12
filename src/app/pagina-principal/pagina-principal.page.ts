import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DatosService } from '../datos.service';
import { BbddService } from '../share/bbdd.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.page.html',
  styleUrls: ['./pagina-principal.page.scss'],
})
export class PaginaPrincipalPage implements OnInit {
  nick:string;
  personas=["Pedro","Juan"]
  textos=["Estoy feliz de esto","Me encanta lo que hago"]

  constructor(private route:Router, private rutaActiva:ActivatedRoute, private bbdd:BbddService, private datos:DatosService) { 
    this.nick=this.datos.getNick(); 
  }

  ngOnInit() {
  }

  // pageNavigator(nombre:String){
  //   let extraNavegacion: NavigationExtras = {
  //     state: {
  //       name: this.nick
  //     }
  //   }
  //  this.route.navigate([nombre], extraNavegacion);
  // }

  pageNavigator(nombre: String) {
    let extraNavegacion: NavigationExtras = {
      state: {
        name: this.datos.getNick()
      }
    }
    this.route.navigate([nombre], extraNavegacion);
  }

  // getLogin() {


  //   //let nick = this.inicioSesionService.sayTheField("nick");
  //   //let pass = this.inicioSesionService.sayTheField("contrasena")

  //   this.bbdd.getLogin(nick, pass).then((data) => {
  //     console.log(data);
  //     if(data[0].logeo===1){
  //       this.bandera = true;
  //     }
  //   }).catch((e) => { alert(e) });
  //   this.verOk = this.bbdd.getverLogin();
    
  // }
}
