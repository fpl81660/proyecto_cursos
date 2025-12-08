import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio implements OnInit {
  cursos: any[] = [];
  
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/cursos'; 

  ngOnInit() {
    this.fetchCursos();
  }

  fetchCursos() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.cursos = data;
        console.log('Cursos cargados:', this.cursos);
      },
      error: (err) => {
        console.error('Error al cargar cursos:', err);
      }
    });
  }
}