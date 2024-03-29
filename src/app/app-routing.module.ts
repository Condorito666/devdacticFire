import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'estudiantes',
    pathMatch: 'full',
  },
  {
    path: 'modal',
    loadChildren: () =>
      import('./modal/modal.module').then((m) => m.ModalPageModule),
  },
  {
    path: 'asignatura',
    loadChildren: () =>
      import('./pages/asignatura/asignatura.module').then(
        (m) => m.AsignaturaPageModule
      ),
  },
  {
    path: 'estudiantes',
    loadChildren: () =>
      import('./pages/estudiantes/estudiantes.module').then(
        (m) => m.EstudiantesPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
