import { Component, inject } from '@angular/core';
import { carrito } from '../../services/carrito';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.scss',
})
export class Carrito {
  public carritoService = inject(carrito);
}