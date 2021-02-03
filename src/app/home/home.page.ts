import { DatosService } from "./../share/datos.service";
import { CopyService } from "./../share/copy.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {

  public horasList: any[] = [];
 // public listaGrupos:any[]=[];
  public listaEstudios :any[]=[];

  constructor(
    private copiaService: CopyService,
    private datosService: DatosService,
    private router:Router,
    private myRuta: ActivatedRoute,
  ) {}
  ngOnInit(): void {}

  irGrupos(nombre:string){
    let extraNav:NavigationExtras={
      state:{
        nombreCurso:nombre
      }
    }
    this.router.navigate(['grupos'],extraNav);
  }

  copiar() {
    this.copiaService.copiarDB();
    alert("data base has been copied!!!!!!!");
  }
  abrir() {
    this.datosService.crearDB();
    alert("data base is opening!!!!!!!");
  }

 async getHoras(){
    await this.datosService.getHoras();
    this.horasList=this.datosService.getHorasList();
    alert("Hours has been copied!!!!!!!");
  }

  async getEstudios(){
    await this.datosService.getEsudios();
    this.listaEstudios= this.datosService.getEstudiosList();
   
  }


}
