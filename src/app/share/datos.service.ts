import { CopyService } from './copy.service';
import { async } from '@angular/core/testing';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  db:SQLiteObject;
  constructor(
    private platform:Platform ,
    private sqlite: SQLite, 
    private copy: CopyService
    ) { }

  async crearDB(){
   await this.platform
  .ready()
  .then(async ()=>{
   console.log("La plataforma no está");
    
   await this.sqlite
   .create(this.getConector()
   )
     .then((db: SQLiteObject) => {
       this.db = db;
       console.log("ya tenemos bbdd");
      //
     })
     .catch(e => console.log(e));
  })
  .catch((err)=>{
    console.log("La plataforma no está lista");
    console.log("Error" + err);
  })

  }
  private getConector() {
    return {
      name: "Horario16.db",
      location: "default",
      createFromLocation: 1,
    };
  } 
}
