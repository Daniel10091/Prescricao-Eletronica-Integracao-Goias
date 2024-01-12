import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  menu: any[] = [];

  items: MenuItem[] | undefined;
   
  constructor(public router: Router) {
  }

  ngOnInit(): void {
    this.menu = [
      {
        label: 'Home',
        link: '/inicio'
      },
      {
        label: 'Prescrição',
        link: '/prescricao'
      },
      // {
      //   label: 'Paciente',
      //   link: '/paciente'
      // },
      // {
      //   label: 'Medicamento',
      //   link: '/medicamento'
      // },
      // {
      //   label: 'Médico',
      //   link: '/medico'
      // },
      // {
      //   label: 'Farmácia',
      //   link: '/farmacia'
      // },
      // {
      //   label: 'Estoque',
      //   link: '/estoque'
      // },
      // {
      //   label: 'Login',
      //   link: '/login'
      // }
    ];

    this.items = [
      { label: 'Início', icon: 'pi pi-fw pi-home', routerLink: '/inicio' },
      { label: 'Prescrição', icon: 'pi pi-fw pi-pencil', routerLink: '/prescricao' },
  ];
  }
  
}
