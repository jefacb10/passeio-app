import { Injectable } from '@angular/core';
import { Categoria } from '../categorias/categoria';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Lugar } from './lugar';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LugarService {
    private apiUrl: string = environment.apiUrl + '/lugares';

    constructor(private httpClient: HttpClient) {}

    salvarLugar(lugar: Lugar): Observable<Lugar> {
        return this.httpClient.post<Lugar>(`${this.apiUrl}`, lugar);
    }

    obterLugares(): Observable<Lugar[]> {
        return this.httpClient.get<Lugar[]>(`${this.apiUrl}`);
    }

    filtrar(nome: string, categoria: string): Observable<Lugar[]> {
        let url = `${this.apiUrl}`;
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