import { Component, OnInit } from '@angular/core';
import { LugarService } from '../../lugares/lugar.service';
import { Lugar } from '../../lugares/lugar';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';

@Component({
  selector: 'app-galeria',
  standalone: false,
  styleUrl: './galeria.component.scss',
  templateUrl: './galeria.component.html',
})
export class GaleriaComponent implements OnInit {

  nomeFiltro: string = '';
  categoriaFiltro: string | null = null

  lugares: Lugar[] = [];
  categoriasFiltro: Categoria[] = [];

  constructor(
    private lugarService: LugarService, 
    private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.obterTodas()
    .subscribe({
      next: (categorias) => {
        this.categoriasFiltro = categorias;
      },
      error: (error) => console.error('Erro ao obter categorias:', error)
    });

    this.lugarService.obterLugares()
    .subscribe({
      next: (lugares) => {
        this.lugares = lugares;
      },
      error: (error) => console.error('Erro ao obter lugares:', error)
    });
  }

  getTotalEstrelas(lugar: Lugar): string {
    const avaliacao = Number(lugar.avaliacao) || 0;
    return '★'.repeat(avaliacao) + '☆'.repeat(5 - avaliacao);
  }

  filtrar() {
      this.lugarService.filtrar(this.nomeFiltro, this.categoriaFiltro || '')
      .subscribe({
        next: (lugaresFiltrados) => {
          this.lugares = [];
          this.lugares = lugaresFiltrados;
        },
        error: (error) => console.error('Erro ao filtrar lugares:', error)
      });
    }

    
  }