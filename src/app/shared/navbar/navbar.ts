import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Autentificación } from '../../services/autentificación';
import { carrito } from '../../services/carrito';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  public auth = inject(Autentificación);
  public carrito = inject(carrito);
}