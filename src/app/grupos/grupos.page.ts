import { DatosService } from "./../share/datos.service";
import { CopyService } from "./../share/copy.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";

@Component({
  selector: "app-grupos",
  templateUrl: "./grupos.page.html",
  styleUrls: ["./grupos.page.scss"],
})
export class GruposPage implements OnInit {
  grupoNombre: string;
  listaGrupos: any[] = [];

  constructor(
    private copiaService: CopyService,
    private datosService: DatosService,
    private route: Router,
    private myRuta: ActivatedRoute
  ) {
    this.myRuta.queryParamMap.subscribe(() => {
      this.grupoNombre = this.route.getCurrentNavigation().extras.state.nombreCurso;
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

  navHorario(name: string) {
    let extraNavegation: NavigationExtras = {
      state: {
        nombreCurso: name,
      },
    };
    this.route.navigate(["horario"], extraNavegation);
  }
}
