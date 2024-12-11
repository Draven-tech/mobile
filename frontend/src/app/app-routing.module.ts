import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
  },
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard], // Ensure user authentication
  },

  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartPageModule),
  },

  
  {
    path: 'add-item',
    loadChildren: () => import('./add-item/add-item.module').then( m => m.AddItemPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-item/:id',
    loadChildren: () => import('./edit-item/edit-item.module').then( m => m.EditItemPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}