import { CopyService } from "./copy.service";
import { async } from "@angular/core/testing";
import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";

@Injectable({
  providedIn: "root",
})
export class DatosService {

  db: SQLiteObject;
  public horasList: any[] = [];
  public listaGrupos:any[]=[];
  public listaEstudios :any[]=[];
  public listaHoras: any[] = [];

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private copy: CopyService,
  ) {}
  // private isOpen=false;
  async executeSentencia(
    target: any[],
    sqlSentence: string,
    searchParam: any[]
  ) {
    //searchParam > parametro de busceda
    let consultable = true;
    if (!this.db) {
      await this.crearDB()
        .then(() => {
          console.log(this.db);
        })
        .catch(() => {
          consultable = false;
        });
    }
    if (consultable) {
      this.db
        .executeSql(sqlSentence, searchParam)
        .then((data) => {
          for (let i = 0; i < data.rows.length; i++) {
            let obj = data.rows.item(i);
            target.push(obj);
          }
        })
        .catch((e) => {
          console.log("fallo al ejeecutar sentencia" + JSON.stringify(e));
        });
    }
  }

  async getHoras() {
    const sql = "Select descripcion as nombre from horasSemana";
    await this.executeSentencia(this.horasList, sql, []);
  }

  async getEsudios() {
    const sql = "select nombre as nombre from estudios;";
    await this.executeSentencia(this.listaEstudios, sql, []);
  }
  async obtenerGrupo(estudios:string){
    this.listaGrupos=[];
    const sql =
    `Select grupo.nombre as nombre from grupo INNER JOIN estudios ON grupo.idEstudios = estudios.idEstudios where estudios.nombre like "${estudios}"`;
 await this.executeSentencia(this.listaGrupos,sql,[]);
 //console.log(sql);

 
  }
  async getHorasClasesHorario(grupo: string) {
    this.listaHoras = [];
    const sql = `select diaSemana.nombre as dia, horasSemana.descripcion as hora, materia.nombre as nombreMateria from horasSemana, diaClase, materiahoraclase, horaClase, materia, diaSemana, grupo, estudios where 
    grupo.nombre like "${grupo}"
    and diaSemana.idDiaSemana==diaClase.idDiaSemana
    and diaclase.idGrupo==grupo.idGrupo
    and horaclase.idDiaClase==diaclase.idDiaClase
    and horaclase.idHorasSemana==horassemana.idHorasSemana
    and materiahoraclase.idHoraClase==horaclase.idHoraClase
    and materiahoraclase.idMateria==materia.idMateria
    group by horaClase.idHorasSemana, horaClase.idDiaClase, horaClase.idHoraClase`;
    console.log(sql);
    
    await this.executeSentencia(this.listaHoras,sql,[]);
  }

  async crearDB() {
    await this.platform
      .ready()
      .then(async () => {
        console.log("La plataforma no está");

        await this.sqlite
          .create(this.getConector())
          .then((db: SQLiteObject) => {
            this.db = db;
            console.log("ya tenemos bbdd");
            //
          })
          .catch((e) => console.log(e));
      })
      .catch((err) => {
        console.log("La plataforma no está lista");
        console.log("Error" + err);
      });
  }

  getHorasList(){
    return this.horasList;
  }

  getEstudiosList(){
    return this.listaEstudios;
  }

  getGruposList(){
    return this.listaGrupos;
  }

  getHorasClaseList(){
    return this.listaHoras;
  }


  private getConector() {
    return {
      name: "Horario16.db",
      location: "default",
      createFromLocation: 1,
    };
  }
}
