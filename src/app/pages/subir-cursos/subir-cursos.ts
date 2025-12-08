import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core'; 
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subir-cursos',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './subir-cursos.html',
  styleUrl: './subir-cursos.scss',
})
export class SubirCursos {
  model = {
    idcreador: '',
    titulo: '',
    descripcion: '',
    precio: '',
    foto: '',
    usuarios_inscritos: ''
  };
  private apiUrl = 'http://localhost:3000/subir-cursos';
    
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
