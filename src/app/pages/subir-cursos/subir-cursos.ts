import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core'; 
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Autentificación } from '../../services/autentificación';

@Component({
  selector: 'app-subir-cursos',
  standalone: true, // Asegúrate que sea standalone si tu proyecto lo es
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
  
  // Variable para guardar el archivo seleccionado
  selectedFile: File | null = null;

  // Cambia esto a la ruta correcta de tu backend (sin /crear-curso si usas el Router como base)
  private apiUrl = 'http://localhost:3000/cursos'; 
  
  private http = inject(HttpClient);
  private router = inject(Router);
  public auth = inject(Autentificación); // Para obtener el ID del usuario

  // Función que se ejecuta cuando el usuario selecciona un archivo
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // 1. Crear un objeto FormData
    const formData = new FormData();
    
    // 2. Agregar los campos de texto
    // Usamos el ID del usuario logueado o '1' por defecto si no hay sesión (para pruebas)
    const idCreador = this.auth.currentUser()?.nombre || '1'; // OJO: Tu tabla pide INT, asegúrate de mandar el ID, no el nombre.
    // Si tu servicio de auth no tiene ID, necesitarás agregarlo. Asumiremos '1' por ahora.
    
    formData.append('idcreador', '1'); 
    formData.append('titulo', this.model.titulo);
    formData.append('descripcion', this.model.descripcion);
    formData.append('precio', this.model.precio.toString());
    formData.append('usuarios_inscritos', '0');

    // 3. Agregar el archivo (si existe)
    if (this.selectedFile) {
      // 'foto' debe coincidir con upload.single('foto') del backend
      formData.append('foto', this.selectedFile);
    }

    // 4. Enviar al backend (No hace falta setear Headers, Angular lo hace automático con FormData)
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