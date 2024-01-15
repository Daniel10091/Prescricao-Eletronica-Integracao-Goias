import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Message, MessageService, SelectItem } from 'primeng/api';

import { Endereco } from 'src/app/models/endereco';
import { LocalAtendimento } from 'src/app/models/localAtendimento';
import { Medicamento } from 'src/app/models/medicamento';
import { Paciente } from 'src/app/models/paciente';
import { Prescricao } from 'src/app/models/prescricao';
import { RequestMessage } from 'src/app/models/requestMessage';
import { ResponsavelLegal } from 'src/app/models/responsavelLegal';

import { AuthAccessRequestService } from 'src/app/services/auth-access-request.service';
import { IntegrationMessagesService } from 'src/app/services/integration-messages.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  providers: [ IntegrationMessagesService, MessageService ]
})
export class InicioComponent implements OnInit {

  // Integration URL
  protected prescricaoIntegracaoUrl = 'http://localhost:4200/prescricao-integracao';

  // Utils
  addMedicamento = false;
  msgs: Message[] = [];
  accessTokenModalDisplay: boolean = false;

  // UI
  @ViewChild('addPacienteSelection') addPacienteSelection?: ElementRef;
  @ViewChild('addMedicamentoButtom') addMedicamentoButtom?: ElementRef;
  @ViewChild('addLocalAtendimentoSelection') addLocalAtendimentoSelection?: ElementRef;
  @ViewChild('accessTokenField') accessTokenField?: ElementRef;

  // Paciente UI
  pacientes: SelectItem[] = [];
  filteredMedicamentos: SelectItem[] = [];
  selectedPacienteDrop: SelectItem[] = [];

  // Medicamento UI
  medicamentos: SelectItem[] = [];
  selectedMedicamentoDrop: SelectItem[] = [];

  // Local de atendimento UI
  locaisAtendimento: SelectItem[] = [];
  selectedLocalAtendimentoDrop: SelectItem = { value: '' };

  // Prescrição
  prescricao?: Prescricao;

  // Paciente
  pacientesFiltrados: Paciente[] = new Array<Paciente>();
  pacienteSelecionado: Paciente = new Paciente();
  paciente: Paciente = new Paciente();
  
  // Medicamentos
  medicamentosFiltrados: Medicamento[] = new Array<Medicamento>();
  medicamentoSelecionado: Medicamento = new Medicamento();
  medicamentosSelecionados: Medicamento[] = new Array<Medicamento>();
  medicamento: Medicamento = new Medicamento();
  
  // Local de atendimento
  locaisAtendimentoFiltrados: LocalAtendimento[] = new Array<LocalAtendimento>();
  localAtendimentoSelecionado: LocalAtendimento = new LocalAtendimento();
  localAtendimento: LocalAtendimento = new LocalAtendimento();

  // Accress token
  accessToken = '';
  invalidToken: boolean = false;

  // Request message
  requestMessage?: RequestMessage;
  
  constructor(
    private service: MessageService,
    private authAccessRequestService: AuthAccessRequestService,
    private integrationMessagesService: IntegrationMessagesService
  ) { }

  ngOnInit(): void {
    // Popula a lista de pacientes a ser carregados.
    let inicializarPacientes = [
      new Paciente('1', 'Daniel', 'Paciente 1', '02320121056', '19900101', 'M', 'daniel@gmail.com', '62999999999', '6233333333', new Endereco(), new ResponsavelLegal()),
      new Paciente('2', 'Natália', 'Paciente 2', '91580632009', '19900101', 'F', 'natalia@gmail.com', '62999999999', '6233333333', new Endereco(), new ResponsavelLegal()),
      new Paciente('3', 'João', 'Paciente 3', '29207640040', '19900101', 'M', 'joao@gmail.com', '62999999999', '6233333333', new Endereco(), new ResponsavelLegal()),
      new Paciente('4', 'Maria', 'Paciente 4', '59622212069', '19900101', 'F', 'maria@gmail.com', '62999999999', '6233333333', new Endereco(), new ResponsavelLegal()),
      new Paciente('5', 'José', 'Paciente 5', '41863239090', '19900101', 'M', 'jose@gmail.com', '62999999999', '6233333333', new Endereco(), new ResponsavelLegal()),
      new Paciente('6', 'Ana', 'Paciente 6', '89868649080', '19900101', 'F', 'ana@gmail.com', '62999999999', '6233333333', new Endereco(), new ResponsavelLegal()),
      new Paciente('7', 'Pedro', 'Paciente 7', '94225868010', '19900101', 'M', 'pedro@gmail.com', '62999999999', '6233333333', new Endereco(), new ResponsavelLegal()),
    ];
    
    // Inicializa a lista de pacientes.
    inicializarPacientes.forEach((paciente: Paciente) => {
      let pacienteNome = paciente.cpf + ' - ' + paciente.nome;
      this.pacientes.push({ label: pacienteNome, value: paciente });
    });
    
    // Popula a lista de locais de atendimento a ser carregados.
    let inicializarLocaisAtendimento = [
      new LocalAtendimento('1', 'logo', 'Local 1', new Endereco(), 'email@gmail.com', '62999999999', '6233333333'),
      new LocalAtendimento('2', 'logo', 'Local 2', new Endereco(), 'email@gmail.com', '62999999999', '6233333333'),
      new LocalAtendimento('3', 'logo', 'Local 3', new Endereco(), 'email@gmail.com', '62999999999', '6233333333')
    ];

    // Inicializa a lista de locais de atendimento.
    inicializarLocaisAtendimento.forEach((localAtendimento: LocalAtendimento) => {
      this.locaisAtendimento.push({ label: localAtendimento.nome, value: localAtendimento });
    });

    // Popula a lista de medicamentos a ser carregados.
    // this.medicamentos = [
    //   { label: 'Amoxcilina', value: 'Amoxcilina' },
    //   { label: 'Dipirona', value: 'Dipirona' },
    //   { label: 'Paracetamol', value: 'Paracetamol' },
    //   { label: 'Ibuprofeno', value: 'Ibuprofeno' },
    //   { label: 'Dorflex', value: 'Dorflex' }
    // ];

    [
      {
        "id": 662,
        "nome": "amoxilina",
        "medicoId": 129
      },
      {
        "id": 590,
        "nome": "DIPIRONA SODICA",
        "medicoId": 129
      },
      {
        "id": 461,
        "nome": "DIPRIVAN",
        "medicoId": 129
      },
      {
        "id": 587,
        "nome": "rivotril",
        "medicoId": 129
      },
    ].forEach((medicamento: any) => {
      let medicamentoNome = medicamento.nome;
      this.medicamentos.push({ label: medicamentoNome, value: medicamento });
    });

    // Inicializa a lista de medicamentos selecionados.
    this.medicamentosSelecionados = [
      // new Medicamento('1', false, 'Amoxcilina', '2mg', 2, 'Tomar diariamente.')
    ];
    
  }

  // ========== [ Access token modal ] ==========

  /**
   * Abre/fecha o modal de access token.
   * 
   * @returns void 
   */
  public toggleAccessTokenModal(): void {
    if (this.accessTokenModalDisplay) {
      if (this.accessToken !== '') {
        this.accessTokenModalDisplay = false;
        this.invalidToken = false;
      } else {
        this.invalidToken = true;
        this.showWarnViaToast('Não é possível continuar', 'É necessário informar o token de acesso.');
      }
    } else {
      this.accessTokenModalDisplay = true;
      this.invalidToken = false;
    }
  }

  // ========== [ Medicamento ] ==========

  /**
   * Abre/fecha add medicamento box.
   * 
   * @param value 
   * @returns void
   */
  public toggleAddMedicamentoBox(value: boolean): void {
    if (this.addMedicamentoButtom?.nativeElement.classList.contains('warning-alert'))
      this.addMedicamentoButtom?.nativeElement.classList.remove('warning-alert');
    
    this.addMedicamento = value;
  }

  /**
   * Filtra medicamentos.
   * 
   * @param event 
   * @returns void 
   */
  public filterMedicamento(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.medicamentos.length; i++) {
      const medicamento = this.medicamentos[i];
      if (medicamento.label!.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(medicamento);
      }
    }

    this.filteredMedicamentos = filtered;
    this.medicamento = this.filteredMedicamentos[0].value;
  }

  /**
   * Abre a box e cria uma instância de {@link Medicamento} para popular um novo medicamento.
   * 
   * @returns void 
   */
  public newMedicamento(): void {
    this.toggleAddMedicamentoBox(true);
    this.medicamento = new Medicamento();
  }
  
  /**
   * Abre a box para editar um medicamento.
   * 
   * @param medicamento 
   * @returns void 
   */
  public editMedicamento(medicamento: Medicamento): void {
    this.toggleAddMedicamentoBox(true);
    this.medicamento = medicamento;
  }

  /**
   * Adiciona um medicamento. Se o medicamento já existir na lista de medicamentos selecionados, atualiza-o. Caso contrário, adiciona-o.
   * 
   * @param medicamento 
   * @returns void 
   */
  public adicionarMedicamento(medicamento: Medicamento): void {
    console.log('====================================');
    console.log(medicamento);
    console.log('====================================');
    if (this.valueIsNotNull(medicamento.nome) && this.valueIsNotNull(medicamento.quantidade)) {
      if (this.medicamentosSelecionados.filter((medicamentoSelecionado) => {
        return medicamentoSelecionado.idMedicamento === medicamento.idMedicamento;
      }).length === 0) {
        if (this.valueIsNotNull(medicamento.nome) && this.valueIsNotNull(medicamento.quantidade)) {
          this.setMedicamentos(medicamento);
          this.toggleAddMedicamentoBox(false);
        } else {
          this.showErrorViaToast('Não é possível adicionar o medicamento', 'Preencha os campos obrigatórios.');
        }
      } else {
        if (this.valueIsNotNull(medicamento.nome) && this.valueIsNotNull(medicamento.quantidade)) {
          this.setUpdatedMedicamento(medicamento);
          this.toggleAddMedicamentoBox(false);
        } else {
          this.showErrorViaToast('Não é possível atualizar o medicamento', 'Preencha os campos obrigatórios.');
        }
      }
    } else {
      this.showErrorViaToast('Não é possível adicionar o medicamento', 'Preencha os campos obrigatórios.');
    }
  }

  /**
   * Adiciona um medicamento na lista de medicamentos selecionados.
   * 
   * @param medicamento 
   * @returns void 
   */
  public setMedicamentos(medicamento: Medicamento): void {
    this.medicamentosSelecionados.push(medicamento);
    console.log(this.medicamentosSelecionados);
  }

  /**
   * Atualiza um medicamento na lista de medicamentos selecionados.
   * 
   * @param medicamento 
   * @returns void 
   */
  public setUpdatedMedicamento(medicamento: Medicamento): void {
    this.medicamentosSelecionados = this.medicamentosSelecionados.map((medicamentoSelecionado) => {
      if (medicamentoSelecionado.idMedicamento === medicamento.idMedicamento) {
        return medicamento;
      } else {
        return medicamentoSelecionado;
      }
    });
  }

  /**
   * Remove um medicamento da lista de medicamentos selecionados.
   * 
   * @param medicamento 
   * @returns void 
   */
  public deleteMedicamento(medicamento: Medicamento): void {
    this.medicamentosSelecionados = this.medicamentosSelecionados.filter((medicamentoSelecionado) => {
      return medicamentoSelecionado.idMedicamento !== medicamento.idMedicamento;
    });
  }

  /**
   * Altera o valor da propriedade {@link Medicamento.informacoes} de um medicamento.
   * 
   * @param event 
   * @returns void 
   */
  public changeMedicamentoInformacao(event: any): void {
    this.medicamento.informacoes = event.target.value;
  }

  // ========== [ Prescrição ] ==========

  /**
   * Envia a prescrição.
   * 
   * @returns void 
   */
  public async sendPrescription(): Promise<void> {
    // await this.getAccessToken();
    
    if (this.accessToken !== '' && this.accessToken.length >= 10) {
      this.invalidToken = false;
      
      if (!this.valueIsNotNull(this.pacienteSelecionado.idPaciente)) {
        this.addPacienteSelection?.nativeElement.classList.add('warning-alert');
        this.showWarnViaToast('Não é possível continuar', 'É necessário selecionar um paciente.');
        return;
      }
      if (!this.valueIsNotNull(this.localAtendimentoSelecionado.idLocal)) {
        this.addLocalAtendimentoSelection?.nativeElement.classList.add('warning-alert');
        this.showWarnViaToast('Não é possível continuar', 'É necessário selecionar um local de atendimento.');
        return;
      }
      if (this.medicamentosSelecionados.length === 0) {
        this.addMedicamentoButtom?.nativeElement.classList.add('warning-alert');
        this.showWarnViaToast('Não é possível continuar', 'É necessário selecionar pelo menos um medicamento.');
        return;
      }

      this.prescricao = new Prescricao(this.localAtendimentoSelecionado, this.pacienteSelecionado, this.medicamentosSelecionados);
      this.requestMessage = new RequestMessage(this.accessToken, this.prescricao);

      console.log(this.requestMessage);

      this.integrationMessagesService.parentWindow.postMessage(this.requestMessage);
      this.integrationMessagesService.message$.subscribe((message: any) => {
        console.log(message);
      });
    } else {
      this.invalidToken = true;
      this.showWarnViaToast('Token inválido', 'É necessário informar um token de acesso válido.');
      this.accessTokenModalDisplay = true;
      setTimeout(() => {
        this.accessTokenField?.nativeElement.focus();
      }, 1);
      return;
    }
  }

  // ========== [ Paciente ] ==========
  
  /**
   * Buscar paciente.
   * 
   * @returns void 
   */
  private buscarPaciente(): void {
    this.pacienteSelecionado = new Paciente();
  }
  
  /**
   * Filtrar pacientes.
   * 
   * @param event 
   * @returns void 
   */
  public filtrarPacientes(event: any): void {
    // let query = event.query;
    
    // this.pacientesFiltrados = this.pacientes.filter((paciente: Paciente) => {
    //   return paciente.nome.toLowerCase().includes(query.toLowerCase());
    // });
  }

  /**
   * Selecionar paciente.
   * 
   * @param event 
   * @returns void 
   */
  public selecionarPaciente(event: any): void {
    this.pacienteSelecionado = event.value;
  }

  /**
   * Salvar paciente.
   * 
   * @returns void 
   */
  public salvarPaciente(): void {
    this.paciente = this.pacienteSelecionado;
  }

  // ========== [ Local de atendimento ] ==========

  /**
   * Buscar local de atendimento.
   * 
   * @returns void 
   */
  private buscarLocalAtendimento(): void {
    this.localAtendimento = new LocalAtendimento();
  }

  /**
   * Filtrar locais de atendimento.
   * 
   * @param event 
   * @returns void 
   */
  public filtrarLocaisAtendimento(event: any): void {
    // let query = event.query;
    
    // this.locaisAtendimentoFiltrados = this.locaisAtendimento.filter((localAtendimento: LocalAtendimento) => {
    //   return localAtendimento.nome.toLowerCase().includes(query.toLowerCase());
    // });
  }

  /**
   * Selecionar local de atendimento.
   * 
   * @param event 
   * @returns void 
   */
  public selecionarLocalAtendimento(event: any): void {
    this.localAtendimentoSelecionado = event.value;
  }
  
  /**
   * Salvar local de atendimento.
   * 
   * @returns void 
   */
  private saveLocalAtendimento(): void {
    this.localAtendimento = new LocalAtendimento();
  }
  
  // ========== [ Utils ] ==========

  /**
   * Verifica se um valor é diferente de nulo, indefinido ou vazio.
   * 
   * @param value 
   * @returns boolean 
   */
  private valueIsNotNull(value: any): boolean {
    return value !== null || value !== undefined || value !== '';
  }

  // ========== [ Toast ] ==========

  /**
   * Exibe uma mensagem de sucesso.
   * 
   * @param summary 
   * @param datail 
   * @returns void 
   */
  private showSuccessViaToast(summary: string, datail: string) {
    this.service.add({ key: 'tst', severity: 'success', summary: summary, detail: datail });
  }

  /**
   * Exibe uma mensagem de informação.
   * 
   * @param summary 
   * @param datail 
   * @returns void 
   */
  private showInfoViaToast(summary: string, datail: string) {
    this.service.add({ key: 'tst', severity: 'info', summary: summary, detail: datail });
  }

  /**
   * Exibe uma mensagem de aviso.
   * 
   * @param summary 
   * @param datail 
   * @returns void 
   */
  private showWarnViaToast(summary: string, datail: string) {
    this.service.add({ key: 'tst', severity: 'warn', summary: summary, detail: datail });
  }

  /**
   * Exibe uma mensagem de erro.
   * 
   * @param summary 
   * @param datail 
   * @returns void 
   */
  private showErrorViaToast(summary: string, datail: string) {
    this.service.add({ key: 'tst', severity: 'error', summary: summary, detail: datail });
  }

  // ========== [ Access token ] ==========

  /**
   * Obtém o access token.
   * 
   * @returns void 
   */
  private async getAccessToken(): Promise<void> {
    await this.authAccessRequestService.getToken().subscribe((res: HttpResponse<any>) => {
      this.accessToken = res.body.access_token;
    });
  }

}
