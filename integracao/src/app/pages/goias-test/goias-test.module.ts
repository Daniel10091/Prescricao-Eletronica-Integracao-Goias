import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoiasRoutingModule } from './goias-routing.module';

import { GoiasTestComponent } from './goias-test.component';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from "primeng/autocomplete";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    GoiasTestComponent
  ],
  imports: [
    CommonModule,
    GoiasRoutingModule,
    // Components that are used in the template
    FormsModule,
    InputTextModule,
    DropdownModule,
    AutoCompleteModule,
    InputTextareaModule,
    ButtonModule,
		MessagesModule,
		MessageModule,
		OverlayPanelModule,
    DialogModule,
		ToastModule
  ]
})
export class GoiasTestModule { }
