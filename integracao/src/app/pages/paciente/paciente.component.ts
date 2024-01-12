import { Component, OnInit } from '@angular/core';
import { Endereco } from 'src/app/models/endereco';
import { Paciente } from 'src/app/models/paciente';
import { ResponsavelLegal } from 'src/app/models/responsavelLegal';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {

  showPacienteEndereco = false;

  // Dados do paciente
  paciente: Paciente = new Paciente();
  pacienteResponsavelLegal: ResponsavelLegal = new ResponsavelLegal();
  // Endereço do paciente
  pacienteEndereco: Endereco = new Endereco();

  constructor() { }

  ngOnInit(): void {
  }

  public prepararParaSalvar(): void {
    this.paciente.responsavelLegal = this.pacienteResponsavelLegal;
    this.paciente.endereco = this.pacienteEndereco;
  }
  
  public salvarPaciente(paciente: Paciente): void {
    console.log(paciente);
  }

}
