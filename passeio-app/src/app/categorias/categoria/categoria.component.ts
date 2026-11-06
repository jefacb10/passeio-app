import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria.component',
  standalone: false,
  styleUrl: './categoria.component.scss',
  templateUrl: './categoria.component.html',
})
export class CategoriaComponent {
  camposForm: FormGroup;

  constructor(private categoriaService: CategoriaService) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
    });
  }

  salvar() {
    this.camposForm.markAllAsTouched();
    if(this.camposForm.valid) {
      this.categoriaService.salvar(this.camposForm.value).subscribe({
        next: (categoria) => this.camposForm.reset(),
        error: (error) => console.error('Erro ao salvar categoria:', error)
      });
    }
  }

  isCampoInvalido(campo: string): boolean {
    const controle = this.camposForm.get(campo);
    return controle ? controle.invalid && (controle.dirty || controle.touched) : false;
  }
}
