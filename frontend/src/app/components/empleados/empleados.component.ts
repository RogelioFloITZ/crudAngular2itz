import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmpleadosService } from 'src/app/services/empleados.service';
import { Empleados } from 'src/app/models/empleados';
import { format } from 'path';
import { response } from 'express';

declare var M: any; //variable que sirve para Materialize

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  constructor(public empleadoService: EmpleadosService) { }

  ngOnInit(): void {
    this.getEmpleados();
  }

  resetForm(empleadoform?: NgForm) {
    this.empleadoService.empleado = new Empleados(); //inicializa la variable empelados a vacio
    if (empleadoform) {
      empleadoform.reset();
    }
    this.getEmpleados();
  }
  // metodo que envia los datos de un empleado al servicio web para almacenarlos
  addEmpleado(empleadoForm: NgForm) {
    // console.log(empleadoForm.value);
    //si existe un id ya definido en el formulario
    if (empleadoForm.value._id) {//Actualizadmos
      this.empleadoService.putEmpleado(empleadoForm.value)
        .subscribe(res => {
          // console.log(res);
          M.toast({ html: 'Empleado actualizado correctamente' });
        });
    } else { //insertamos
      this.empleadoService.addEmpleado(empleadoForm.value)
        .subscribe(res => {
          // console.log(res);
          this.resetForm(empleadoForm);
          M.toast({ html: 'Empleado guardado correctamente' });
          this.getEmpleados();
        });
    } //else
    this.resetForm(empleadoForm);
    this.getEmpleados();
  } //fin de add empleados

  //obtener a todos los empleados
  getEmpleados() {
    this.empleadoService.getEmpleado()
      .subscribe(res => {
        this.empleadoService.empleados = res as Empleados[];
        console.log(res);
      });
  }//fin de get empleados

  //editar empleados
  editarEmpelado(empleado: Empleados) {
    this.empleadoService.empleado = empleado; //asocia el empleado de la tabla con el del formulario
  }

  //eliminar un empleado
  eliminarEmpleado(_id: String) {
    if (confirm('¿Estas seguro de eliminar el empleado?')) {
      this.empleadoService.deleteEmpleado(_id)
        .subscribe(res => {
          // console.log(res);
          M.toast({ html: 'Empleado eliminado correctamente' });
          this.getEmpleados();
          this.resetForm();
        });
    }//if

  }//fin de eliminar empleados
}//fin de la clase