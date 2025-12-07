import { Component, inject } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Autentificación } from '../../services/autentificación';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [Navbar],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil {
  public auth = inject(Autentificación);
}