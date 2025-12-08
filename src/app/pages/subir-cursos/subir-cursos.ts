import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core'; 
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Autentificación } from '../../services/autentificación';

@Component({
  selector: 'app-subir-cursos',
  standalone: true, 
  imports: [FormsModule],
  templateUrl: './subir-cursos.html',
  styleUrl: './subir-cursos.scss',
})
export class SubirCursos {
  model = {
    titulo: '',
    descripcion: '',
    precio: 0,
    usuarios_inscritos: 0
  };
  
  selectedFile: File | null = null;

  private apiUrl = 'http://localhost:3000/cursos'; 
  
  private http = inject(HttpClient);
  private router = inject(Router);
  public auth = inject(Autentificación); 

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const usuarioActual = this.auth.currentUser();
    if (!usuarioActual || !usuarioActual.idUsuario) {
      alert("Error: No se pudo identificar al usuario creador. Por favor, inicia sesión nuevamente.");
      return;
    }
    const formData = new FormData();
    
    
    const idCreador = this.auth.currentUser()?.nombre || '1'; 
    
formData.append('idcreador', usuarioActual.idUsuario.toString());    formData.append('titulo', this.model.titulo);
    formData.append('descripcion', this.model.descripcion);
    formData.append('precio', this.model.precio.toString());
    formData.append('usuarios_inscritos', '0');

    
    if (this.selectedFile) {
    
      formData.append('foto', this.selectedFile);
    }

    
    this.http.post(this.apiUrl, formData).subscribe({
      next: (res) => {
        console.log("Curso creado exitosamente");
        alert("Curso creado exitosamente");
        this.router.navigate(['/inicio']); 
      },
      error: (err) => {
        console.error("Error al subir curso", err);
        alert("Error al subir el curso");
      }
    });
  }
}