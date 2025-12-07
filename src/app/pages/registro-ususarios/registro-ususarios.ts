import { HttpClientModule, HttpClient} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro-ususarios',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './registro-ususarios.html',
  styleUrl: './registro-ususarios.scss',
})
export class RegistroUsusarios {
  model ={
    nombre:'',
    correo:'',
    contrasena:'',
    pais:'',
    foto_perfil: 'assets/default.webp'

  };

  private apiUrl = 'http://localhost:3000/RegistroUsuario';

  constructor(private http: HttpClient, private router: Router) {}

   onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.http.post(this.apiUrl, this.model).subscribe({
      next: (res) => {
        console.log("Datos registrados de manera exitosa");
        alert("Datos registrados de manera exitosa");
        form.resetForm();
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        console.log("Transacción fallida");
        alert("Transacción fallida");
      }
    });
  }
}
