import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Autentificación } from '../../services/autentificación';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [Navbar, CommonModule, RouterModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil implements OnInit {
  public auth = inject(Autentificación);
  private http = inject(HttpClient);
  
  misCursos: any[] = [];
  misPublicaciones: any[] = [];
  
  private apiUrl = 'http://localhost:3000/usuario'; 

  ngOnInit() {
    const usuario = this.auth.currentUser();
    
    if (usuario && usuario.idUsuario) {
      this.cargarDatos(usuario.idUsuario);
    }
  }

  cargarDatos(id: number) {
    this.http.get<any[]>(`${this.apiUrl}/${id}/cursos-comprados`).subscribe({
      next: (data) => {
        this.misCursos = data;
        console.log('Cursos comprados:', data);
      },
      error: (err) => console.error("Error cargando cursos comprados", err)
    });

    this.http.get<any[]>(`${this.apiUrl}/${id}/mis-publicaciones`).subscribe({
      next: (data) => {
        this.misPublicaciones = data;
        console.log('Mis publicaciones:', data);
      },
      error: (err) => console.error("Error cargando publicaciones", err)
    });
  }
}