import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'pagina-principal',
    loadChildren: () => import('./pagina-principal/pagina-principal.module').then( m => m.PaginaPrincipalPageModule)
  },
  {
    path: 'lista-amigos',
    loadChildren: () => import('./lista-amigos/lista-amigos.module').then( m => m.ListaAmigosPageModule)
  },
  {
    path: 'agregar-amigos',
    loadChildren: () => import('./agregar-amigos/agregar-amigos.module').then( m => m.AgregarAmigosPageModule)
  },
  {
    path: 'crear-comentario',
    loadChildren: () => import('./crear-comentario/crear-comentario.module').then( m => m.CrearComentarioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
