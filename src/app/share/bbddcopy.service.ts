import { Injectable } from '@angular/core';
import { SqliteDbCopy } from '@ionic-native/sqlite-db-copy/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BbddcopyService {

  constructor(private platform: Platform, private sqliteDbCop: SqliteDbCopy) {}
  async copiarBBDD(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.platform
        .ready()
        .then(() => {
          this.sqliteDbCop
            .copy("CaraLibro.db", 0)
            .then(() => {
              resolve("Copia terminada");
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch(() => {});
    });
  }
}
