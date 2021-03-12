import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { DatosService } from '../datos.service';
import { BbddService } from '../share/bbdd.service';

@Component({
  selector: 'app-agregar-amigos',
  templateUrl: './agregar-amigos.page.html',
  styleUrls: ['./agregar-amigos.page.scss'],
})
export class AgregarAmigosPage implements OnInit {
items:any;
lista:Array<any>=[];

nick:string;
  constructor(private datos:DatosService,private actionSheetCtrl:ActionSheetController,private bbdd:BbddService,private route:Router, private rutaActiva:ActivatedRoute) { 
    this.nick=this.datos.getNick();
    // this.rutaActiva.queryParamMap.subscribe(()=>{
    //   this.nick=this.route.getCurrentNavigation().extras.state.name;
    // }) 
    this.mostrarTodosLosUsuarios();
    this.initializeItems();
  }

  ngOnInit() {
  }

  initializeItems(){
    this.items=this.lista;
  }

  getItems(ev:any){
    this.initializeItems();

    let val=ev.target.value;

    if(val&&val.trim()!=''){
      this.items=this.items.filter((item)=>{
        return (item.Nick.toLowerCase().indexOf(val.toLowerCase())>-1);
      })
    }
  }

  async presentActionSheet(nickAmigo:string) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Menu',
      //cssClass: 'my-custom-class',
      buttons: [{
        text: 'Agregar amigos',
        icon: 'person-add-outline',
        handler: async () => {
          console.log('Delete clicked');
          console.log("Nick del amigo")
          console.log(nickAmigo);
          await this.agregarAmigos(nickAmigo);
        }
      }]
    });
    await actionSheet.present();
  }

  async agregarAmigos(nickAmigo:string) {
    await this.bbdd.agregarAmigo(this.nick, nickAmigo).then().catch();
    await this.bbdd.agregarAmigoDos(this.nick, nickAmigo).then().catch();
  }

  mostrarTodosLosUsuarios(){
    this.bbdd.mostrarTodosLosUsuarios(this.nick).then((data) => {
      console.log(data);
      for (let index = 0; index < data.length; index++) {
        this.lista[index]=data[index];
      }
    }).catch((e) => { alert(e) });
    
  }
}
