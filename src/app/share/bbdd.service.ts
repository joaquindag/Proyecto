import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

import { BbddcopyService } from './bbddcopy.service';

@Injectable({
  providedIn: 'root'
})
export class BbddService {

  private db: SQLiteObject;
  private verCorreoNick:Array<any>=[];
  private verLogin:Array<any>=[];
  private id:Array<any>=[];
  private verUsers:Array<any>=[];
  private verAmigos:Array<any>=[];
  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private copy: BbddcopyService
  ) {}

  executeSentence(target: any[], sqlSentence: string, searchParam: any[]) {
    return new Promise<any>((resolveUno, rejectUno) => {
      let consultable = true;
      new Promise((resolve, reject) => {
        if (true) {
          this.crearBBDD()
            .then(() => {
              resolve(consultable);
            })
            .catch(() => {
              consultable = false;
              reject(consultable);
            });
        } else {
          resolve(consultable);
        }
      })
        .then((bandera) => {
          if (bandera) {
            console.log(sqlSentence)
            this.db
              .executeSql(sqlSentence, searchParam)
              .then((data) => {
                console.log(data);
                for (let i = 0; i < data.rows.length; i++) {
                  let obj = data.rows.item(i);
                  target.push(obj);
                  console.log(obj)
                }
                resolveUno(target);
              })
              .catch((e) => {});
          }
        })
        .catch((err) => {});
    });
  }

  getVerifyNickCorreo(nick: string,correo:string) {
    return new Promise<any>((resolveUno, rejectUno) => {
      const sql = `Select count(*) as registry
                   from Persona
                   where Persona.Correo= "${correo}" or Persona.Nick= "${nick}"`
      this.verCorreoNick=[];
      this.executeSentence(this.verCorreoNick, sql, []).then((data)=>{resolveUno(data)}).catch();
    })
  }

  getLogin(nick: string,password:string) {
    return new Promise<any>((resolveUno, rejectUno) => {
      const sql = `Select count(*) as logeo
                 from Persona 
                 where Persona.Nick= "${nick}" and Persona.Password= "${password}"`
      this.verLogin=[];
      this.executeSentence(this.verLogin, sql, []).then((data)=>{resolveUno(data)}).catch();
    })
  }


  crearRegistro(nombre:string,apellido:string,correo:string,nick:string, telefono:string, password:string) {
    const sql =
      "INSERT INTO Persona (Nombre, Apellido, Correo, Nick, Telefono, Password) VALUES (?,?,?,?,?,?);";
    return this.executeSentence([], sql, [nombre, apellido,correo,nick,telefono,password]);
  }


  crearComentario(nick:string, comentario:string) {
    const sqlId =
    `Select idPersona from Persona where nick=?`
     this.executeSentence(this.id, sqlId, [nick]);

    const sql =
      "INSERT INTO Comentario (idPersona, Comentario) VALUES (?,?);";
    return this.executeSentence([], sql, [this.id[0], comentario]);
  }


  agregarAmigo(personaUsuario:string, personaAmiga:string) {
    const sql =
    `INSERT INTO Amigos (idPersonaUsuario, idPersonaAmiga) VALUES
    ((Select Persona.idPersona From Persona where Persona.nick="${personaAmiga}"),(Select Persona.idPersona From Persona where Persona.nick="${personaUsuario}"))`;
    return this.executeSentence([], sql, []);
  }

  agregarAmigoDos(personaUsuario:string, personaAmiga:string) {
    const sql =
    `INSERT INTO Amigos (idPersonaUsuario, idPersonaAmiga) VALUES
     ((Select Persona.idPersona From Persona where Persona.nick="${personaUsuario}"),(Select Persona.idPersona From Persona where Persona.nick="${personaAmiga}"))`;
    return this.executeSentence([], sql, []);
  }

  eliminarAmigo(personaUsuario:string, personaAmiga:string){
    const sql=`Delete From Amigos where Amigos.idPersonaUsuario=(Select Persona.idPersona From Persona where Persona.nick="${personaUsuario}")
     and Amigos.idPersonaAmiga=(Select Persona.idPersona From Persona where Persona.nick="${personaAmiga}")`;
     return this.executeSentence([],sql,[]);
  }

  eliminarAmigoDos(personaUsuario:string, personaAmiga:string){
    const sql=`Delete From Amigos where Amigos.idPersonaUsuario=(Select Persona.idPersona From Persona where Persona.nick="${personaAmiga}")
    and Amigos.idPersonaAmiga=(Select Persona.idPersona From Persona where Persona.nick="${personaUsuario}")`;
    return this.executeSentence([],sql,[]);
  }

  mostrarTodosLosUsuarios(nick:string){
    return new Promise<any>((resolveUno, rejectUno) => {
    const sql=`Select Persona.Nick 
               from Persona 
               where Persona.Nick!="${nick}"`
      this.verUsers=[];
      this.executeSentence(this.verUsers, sql, []).then((data)=>{resolveUno(data)}).catch();
    })
  }

  mostrarAmigos(nick:string){
    //A revisar mañana en clase
    return new Promise<any>((resolveUno, rejectUno) => {
    const sql= `Select Persona.Nick as mostrar
                from Persona 
                where Persona.idPersona in (Select Amigos.idPersonaAmiga 
                                            From Persona,Amigos 
                                            where Persona.Nick="${nick}" and Persona.idPersona=Amigos.idPersonaUsuario)`
      this.verAmigos=[];
      this.executeSentence(this.verAmigos, sql, []).then((data)=>{resolveUno(data)}).catch();
      console.log(this.verAmigos)
    })
  }

  async crearBBDD() {
    await this.platform
      .ready()
      .then(async () => {
        console.log('la plataforma está lista');

        await this.sqlite
          .create(this.getConector())
          .then((db: SQLiteObject) => {
            this.db = db;
            console.log('ya tenemos nuestra BBDD');
            console.log('------');
          })
          .catch((e) => console.log(e));
      })
      .catch((err) => {
        console.log('la plataforma no esta lista');
        console.log('Error debido a: ' + err);
      });
  }
  private getConector() {
    return {
      name: 'CaraLibro.db',
      location: 'default',
      createFromLocation: 1,
    };
  }

  // getFamiliaList() {
  //   return this.familiaList;
  // }

    getverCorreoNick(){
      return this.verCorreoNick[0];
    }

    getverLogin(){
      return this.verLogin[0];
    }
}
