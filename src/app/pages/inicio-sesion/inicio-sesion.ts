import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router';
import { Autentificación } from '../../services/autentificación';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.scss',
})
export class InicioSesion {
  loginData = {
    nombre: '',
    contrasena: ''
  };

  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(Autentificación);
  
  private apiUrl = 'http://localhost:3000/iniciosesion';

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.http.post<any>(this.apiUrl, this.loginData).subscribe({
      next: (user) => {
        console.log('Datos recibidos del backend:', user); 
        
        this.authService.login(user);

        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        console.error('Error detallado:', err); 
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}