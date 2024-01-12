import { Component, OnDestroy, OnInit } from '@angular/core';
import { CfmRequestMessage, CfmResponseMessage, CfmTipoResposta } from '@conselho-federal-de-medicina/integracao-prescricao-cfm';
import { IntegrationMessagesService } from 'src/app/services/integration-messages.service';

@Component({
  selector: 'app-prescricao',
  templateUrl: './prescricao.component.html',
  styleUrls: ['./prescricao.component.scss']
})
export class PrescricaoComponent implements OnInit, OnDestroy {
  
  msg: string = '';

  transaction = null;

  constructor(private integrationMessages: IntegrationMessagesService) { }

  ngOnInit(): void {
    
    this.integrationMessages.message$.subscribe((message: CfmRequestMessage) => {
      // console.log('msg: ' + msg);
      
      console.log(message);

      this.msg = message.prescricao.paciente.nome;

      setTimeout(() => {
        this.integrationMessages.postMessage(new CfmResponseMessage(CfmTipoResposta.SUCESSO, 'http://www.google.com', ''));
      }, 2000);
    });
    
    this.integrationMessages.startReceivingMessages();

  }

  ngOnDestroy(): void {
    this.integrationMessages.stopReceivingMessages();
  }

}
