import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core'; // Importamos inject
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// Importa tu servicio (asegúrate que la ruta sea correcta)
import { Autentificación } from '../../services/autentificación'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-registro-ususarios',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './registro-ususarios.html',
  styleUrl: './registro-ususarios.scss',
})
export class RegistroUsusarios {
  model = {
    nombre: '',
    correo: '',
    contrasena: '',
    pais: '',
    foto_perfil: 'assets/default.webp' // Imagen por defecto
  };

  private apiUrl = 'http://localhost:3000/RegistroUsuario';
  
  private authService = inject(Autentificación);

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.http.post(this.apiUrl, this.model).subscribe({
      next: (res) => {
        console.log("Datos registrados de manera exitosa");
        alert("Datos registrados de manera exitosa");

        this.authService.login(this.model); 

        form.resetForm();
        this.router.navigate(['/perfil']); 
      },
      error: (err) => {
        console.log("Transacción fallida");
        alert("Transacción fallida");
      }
    });
  }
}