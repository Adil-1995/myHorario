import { SqliteDbCopy } from '@ionic-native/sqlite-db-copy/ngx';

import { async } from '@angular/core/testing';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class CopyService {

  constructor(private platform:Platform ,private sqliteDbCopy: SqliteDbCopy) { }

  async copiarDB(){
  await this.platform
      .ready()
      .then(async() => {
        console.log("La plataforma si esta lista, procedemos a copiar la BBDD" );   
       await  this.sqliteDbCopy
        .copy('Horario16.db', 0)
        .then(()=> {
          console.log("La BBDD se ha copiado correctamente ");
          
        })
        .catch((error) =>{
        console.log("Erroro"+ error);
      });
      })
      .catch((err) => {
        console.log("La plataaforma no esta lista ");
        console.log("error " + err);
        
      });
    
   
  }
}
