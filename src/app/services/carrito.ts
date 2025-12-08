import { Injectable, signal, computed } from '@angular/core';

export interface Curso {
  id: number;
  titulo: string;
  precio: number;
  foto: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class carrito {
  
  items = signal<Curso[]>([]);

  total = computed(() => {
    return this.items().reduce((acc, item) => acc + Number(item.precio), 0);
  });

  count = computed(() => this.items().length);

  constructor() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.items.set(JSON.parse(carritoGuardado));
    }
  }

  agregarCurso(curso: Curso) {
    const yaExiste = this.items().find(c => c.id === curso.id);
    if (!yaExiste) {
      this.items.update(items => [...items, curso]);
      this.guardarStorage();
      alert('Curso agregado al carrito');
    } else {
      alert('Este curso ya está en tu carrito');
    }
  }

  eliminarCurso(id: number) {
    this.items.update(items => items.filter(c => c.id !== id));
    this.guardarStorage();
  }

  limpiarCarrito() {
    this.items.set([]);
    localStorage.removeItem('carrito');
  }

  private guardarStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.items()));
  }
}