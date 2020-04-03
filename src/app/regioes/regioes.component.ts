import { Erro } from './../models/error.model';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Regiao } from '../models/regiao.model';

@Component({
  selector: 'app-regioes',
  templateUrl: './regioes.component.html',
  styleUrls: ['./regioes.component.css']
})
export class RegioesComponent implements OnInit {

  regioes: Array<Regiao>;
  estados: any;
  cidades: any;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {

    this.apiService.listarRegioes().then((data: Array<Regiao>) => {
      this.regioes = data;
    }).catch((error: Erro) => {
      alert(`[${error.code}] ${error.message}. Entre em contado com o administrador!`);
    });

  }

  onSelectRegiao(value: string): void {
    if (value === '0') {
      this.estados = [];
    } else {
      this.apiService.listarEstados(value).subscribe((data) => {
        this.estados = data;
      }, (error: any) => {
        console.log(error);
      });
    }
  }

  verCidades(estado: string): void {
    this.apiService.listarCidades(estado).subscribe((data) => {
      this.cidades = data;
    });
  }
}
