import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { carrito } from '../../services/carrito';
import { Autentificación } from '../../services/autentificación';

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

  private auth = inject(Autentificación);
  private router = inject(Router);

  private apiUrl = 'http://localhost:3000/cursos';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerCurso(id);
      this.verificarCompra(id);
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

  cursoComprado = false;

  verificarCompra(cursoId: string) {
    const user = this.auth.currentUser();
    if (!user) return;

    this.http.get<any[]>(`http://localhost:3000/usuario/${user.idUsuario}/cursos-comprados`).subscribe({
      next: (cursos) => {
        this.cursoComprado = cursos.some(c => c.id == cursoId);
      },
      error: (err) => console.error('Error verificando compra', err)
    });
  }

  agregarAlCarrito() {
    if (!this.auth.currentUser()) {
      this.router.navigate(['/inicio-sesion']);
      return;
    }

    if (this.curso) {
      this.carritoService.agregarCurso(this.curso);
    }
  }
}