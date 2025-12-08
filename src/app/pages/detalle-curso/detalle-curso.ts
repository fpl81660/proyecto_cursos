import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { carrito } from '../../services/carrito';

@Component({
  selector: 'app-detalle-curso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-curso.html',
  styleUrl: './detalle-curso.scss'
})
export class DetalleCurso implements OnInit {
  
  curso: any = null;
  loading = true;

  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private carritoService = inject(carrito);
  
  private apiUrl = 'http://localhost:3000/cursos';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerCurso(id);
    }
  }

  obtenerCurso(id: string) {
    this.http.get(`${this.apiUrl}/${id}`).subscribe({
      next: (data) => {
        this.curso = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  agregarAlCarrito() {
    if (this.curso) {
      this.carritoService.agregarCurso(this.curso);
    }
  }
}