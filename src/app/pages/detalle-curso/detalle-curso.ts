import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-curso',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-curso.html',
  styleUrls: ['./detalle-curso.scss'],
})
export class DetalleCurso implements OnInit {
  curso: any = null;
  
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/cursos';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchCursoDetalle(id);
    }
  }

  fetchCursoDetalle(id: string): void {
    this.http.get<any>(`${this.apiUrl}/${id}`).subscribe({
      next: (data) => {
        this.curso = data;
        console.log('Detalle del curso cargado:', this.curso);
      },
      error: (err) => {
        console.error('Error al cargar el detalle del curso:', err);
      },
    });
  }
}
