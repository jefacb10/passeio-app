import { Component, OnInit } from '@angular/core';
import { Layoutprops } from './layoutprops';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: false,
  styleUrl: './layout.component.scss',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  props: Layoutprops = { titulo: 'Passeio', subtitulo: 'Descubra lugares incríveis' };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events
    .pipe(
      filter(() => this.activatedRoute.firstChild !== null),
      map(() => this.obterPropriedadesLayout())
    )
    .subscribe((props: Layoutprops) => {
      this.props = props;
    });
  }

  obterPropriedadesLayout(): Layoutprops {
    let rotaFilha = this.activatedRoute.firstChild;
    while (rotaFilha?.firstChild) {
      rotaFilha = rotaFilha.firstChild;
    }
    if (rotaFilha?.snapshot.data) {
      return {
        titulo: rotaFilha.snapshot.data['titulo'] || 'Passeio',
        subtitulo: rotaFilha.snapshot.data['subtitulo'] || 'Descubra lugares incríveis'
      };
    }
    return { titulo: 'Passeio', subtitulo: 'Descubra lugares incríveis' };
  }
}

  // updateLayoutProps(currentRoute: ActivatedRoute) {
  //   while (currentRoute.firstChild) {
  //     currentRoute = currentRoute.firstChild;
  //   }
  //   if (currentRoute.snapshot.data) {
  //     this.props.titulo = currentRoute.snapshot.data['titulo'] || '';
  //     this.props.subtitulo = currentRoute.snapshot.data['subtitulo'] || '';
  //   } else {
  //     this.props.titulo = 'Passeio';
  //     this.props.subtitulo = 'Descubra lugares incríveis';
  //   }
  // }

