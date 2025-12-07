import { Injectable, signal } from '@angular/core';

export interface Usuario {
  nombre: string;
  correo: string;
  pais: string;
  foto_perfil?: string;
  contrasena?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Autentificación {
  
  currentUser = signal<Usuario | null>(null);

  constructor() {

    const storedUser = localStorage.getItem('usuario_sesion');
    if (storedUser) {
      try {
        this.currentUser.set(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error al recuperar sesión', e);
      }
    }
  }

  login(user: Usuario) {
    this.currentUser.set(user);
    localStorage.setItem('usuario_sesion', JSON.stringify(user));
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('usuario_sesion');
  }
}
