import { async } from "@angular/core/testing";
import { DatosService } from "./../share/datos.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { CopyService } from "../share/copy.service";

@Component({
  selector: "app-horario",
  templateUrl: "./horario.page.html",
  styleUrls: ["./horario.page.scss"],
})
export class HorarioPage implements OnInit {
  nombreCurso: string;
  horasListClase: any[] = [];
  horarioOrganizado: any[] = [];
  horasNoRepetidas: Set<string> = new Set<string>(); // To avoid displying the same names in the list
  cabezera: Set<string> = new Set<string>();
  asignatura: string[] = [];

  constructor(
    private copiaService: CopyService,
    private datosService: DatosService,
    private route: Router,
    private activatedRuta: ActivatedRoute
  ) {
    this.activatedRuta.queryParamMap.subscribe(() => {
      this.nombreCurso = this.route.getCurrentNavigation().extras.state.nombreCurso;
    });
  }

  ngOnInit() {}

  async obtenerHorasClase() {
    await this.datosService.getHorasClasesHorario(this.nombreCurso);
    this.horasListClase = this.datosService.getHorasClaseList();
  }

  mostrarHorarioClase() {
    this.cabezera.add("Horas");
    this.horasListClase.map((obj: any) => {
      this.cabezera.add(obj.dia); //as dia
      this.horasNoRepetidas.add(obj.hora); // as hora
      this.asignatura.push(obj.nombreMateria); //as nombreMateria
    });
    let array = Array.from(this.horasNoRepetidas); //save none repeated hours in Array
    do {
      this.horasListClase.map((obj: any) => {
        if (obj.hora === array[0]) {
          this.horarioOrganizado.push(obj);
        }
      });
      array.shift(); //Removes the first element from an array and returns it
    } while ((array.length = 0));
  }

  obtenerAsignatura(hora: string): string[] {
    let asignatuta: string[] = [];
    this.horarioOrganizado.forEach((obj: any) => {
      if (obj.hora === hora) {
        asignatuta.push(obj.nombreMateria);
      }
    });
    return asignatuta;
  }
}

//
