import { DatosService } from "./../share/datos.service";
import { CopyService } from "./../share/copy.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { getgroups } from "process";

@Component({
  selector: "app-grupos",
  templateUrl: "./grupos.page.html",
  styleUrls: ["./grupos.page.scss"],
})
export class GruposPage implements OnInit {
  grupoNombre: string;
  listaGrupos: any[] = [];

  // constructor() {}
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  constructor(
    private copiaService: CopyService,
    private datosService: DatosService,
    private router: Router,
    private myRuta: ActivatedRoute
  ) {
    this.myRuta.queryParamMap.subscribe(() => {
      this.grupoNombre = this.router.getCurrentNavigation().extras.state.nombreCurso;
      this.getGrupos();
    });
  }

  ngOnInit() {}

  async getGrupos() {
    this.listaGrupos = [];
    await this.datosService.obtenerGrupo(this.grupoNombre);
    this.listaGrupos = this.datosService.getGruposList();
    console.log(this.listaGrupos);

    
  }
}
