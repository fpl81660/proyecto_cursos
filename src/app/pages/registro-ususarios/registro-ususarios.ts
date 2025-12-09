import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core'; 
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Autentificación } from '../../services/autentificación'; 

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
    foto_perfil: 'assets/default.webp'
  };

  private apiUrl = 'http://localhost:3000/registrousuario/RegistroUsuario';
  
  private authService = inject(Autentificación);

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.http.post<any>(this.apiUrl, this.model).subscribe({
      next: (res) => {
        console.log("Datos registrados de manera exitosa", res);
        alert("Datos registrados de manera exitosa");

        const nuevoUsuario = {
          ...this.model,          
          idUsuario: res.idGenerado 
        };

        this.authService.login(nuevoUsuario); 

        form.resetForm();
        this.router.navigate(['/inicio']); 
      },
      error: (err) => {
        console.error("Error en registro:", err);
        alert("Transacción fallida");
      }
    });
  }
}