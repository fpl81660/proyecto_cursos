import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { carrito } from '../../services/carrito';
import { Autentificación } from '../../services/autentificación';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pago.html',
})
export class Pago {
  carritoService = inject(carrito);
  auth = inject(Autentificación);
  http = inject(HttpClient);
  router = inject(Router);

  datosPago = {
    nombreTarjeta: '',
    numeroTarjeta: '',
    expiracion: '',
    cvv: ''
  };

  procesarPago() {
    const usuario = this.auth.currentUser();
    
    if (!usuario) {
      alert("Debes iniciar sesión para comprar");
      this.router.navigate(['/inicio-sesion']);
      return;
    }

    const payload = {
      usuario_id: usuario.idUsuario,
      cursos: this.carritoService.items(),
      metodo_pago: 'Tarjeta Crédito/Débito' 
    };

    this.http.post('http://localhost:3000/usuario/comprar', payload).subscribe({
      next: (res) => {
        alert("¡Compra realizada con éxito!");
        this.carritoService.limpiarCarrito();
        this.router.navigate(['/perfil']); 
      },
      error: (err) => {
        console.error(err);
        const mensajeError = err.error?.mensaje || "Error desconocido. Revisa la consola para más detalles.";
        alert(`Error al procesar el pago: ${mensajeError}`);
      }
    });
  }
}