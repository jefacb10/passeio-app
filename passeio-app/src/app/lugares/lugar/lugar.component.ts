import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LugarService } from '../lugar.service';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  styleUrl: './lugar.component.scss',
  templateUrl: './lugar.component.html',
})


export class LugarComponent implements OnInit {
  
  camposForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService, private lugarService: LugarService) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      localizacao: new FormControl('', [Validators.required]),
      urlFoto: new FormControl('', [Validators.required]),
      avaliacao: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
    });
  }

  ngOnInit():  void {
    this.categoriaService.obterTodas().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        this.camposForm.get('categoria')?.setValue(categorias.length > 0 ? categorias[0].id : null);
      },
      error: (error) => console.error('Erro ao obter categorias:', error)
    });
  }

  salvar() {
    this.camposForm.markAllAsTouched();
    if (this.camposForm.valid) {
      this.lugarService.salvarLugar(this.camposForm.value).subscribe({
        next: (lugar) =>{
            console.log('Lugar salvo com sucesso:', lugar);
            this.camposForm.reset();
        },
        error: (error) => console.error('Erro ao salvar lugar:', error)
      });
    }
  }

  isCampoInvalido(campo: string): boolean {
    const controle = this.camposForm.get(campo);
    return controle ? controle.invalid && (controle.dirty || controle.touched) : false;
  }
}

