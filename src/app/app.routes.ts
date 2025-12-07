import { Routes } from '@angular/router';
import { Perfil } from './pages/perfil/perfil';
import { InicioSesion } from './pages/inicio-sesion/inicio-sesion';
import { Inicio } from './pages/inicio/inicio';
import { Carrito } from './pages/carrito/carrito';

export const routes: Routes = [
     {path:"",component:Perfil},
    {path:"inicio-sesion",component:InicioSesion},
    {path:"perfil",component:Perfil},
    {path:"inicio", component:Inicio},
    {path:"carrito", component:Carrito},
    {path:"**", redirectTo:""}
];
