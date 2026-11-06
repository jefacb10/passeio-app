import { Injectable } from '@angular/core';
import { Categoria } from '../categorias/categoria';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Lugar } from './lugar';

@Injectable({
  providedIn: 'root'
})
export class LugarService {
    constructor(private httpClient: HttpClient) {}

    salvarLugar(lugar: Lugar): Observable<Lugar> {
        return this.httpClient.post<Lugar>('http://localhost:3000/lugares', lugar);
    }

    obterLugares(): Observable<Lugar[]> {
        return this.httpClient.get<Lugar[]>('http://localhost:3000/lugares');
    }

    filtrar(nome: string, categoria: string): Observable<Lugar[]> {
        let url = 'http://localhost:3000/lugares';
        let params = new HttpParams();

        if (nome) {
            params =params.set('nome_like', nome);
        }

        if (categoria && categoria !== '-1') {
            params = params.set('categoria', categoria);
        }

        return this.httpClient.get<Lugar[]>(url, { params: params });
    }
}