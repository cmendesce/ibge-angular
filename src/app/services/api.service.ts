import { Erro } from './../models/error.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Regiao } from '../models/regiao.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  listarRegioes(): Promise<Array<Regiao>> {
    return new Promise((resolve, reject) => {
      this.http.get('https://servicodados.ibge.gov.br/api/v1/localidades/regioes').subscribe((data: Array<any>) => {
      const regioes: Array<Regiao> = [];
        data.forEach(item => {
          regioes.push(new Regiao(item.id, item.nome));
        });
        resolve(regioes);
      }, (error: any) => {
        console.error('Ocorreu um erro ');
        reject(new Erro('123', 'Desculpe, estamos com problema'));
      });
    });
  }

  listarEstados(regiao: string): Observable<any> {
    return this.http.get(`https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${regiao}/estados`);
  }

  listarCidades(estado: string): Observable<any> {
    return this.http.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`);
  }
}
