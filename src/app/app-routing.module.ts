import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './products/dashboard/dashboard.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { authGuard, authenticationGuard } from './core/guards/auth.guard';
import { SingUpComponent } from './auth/sing-up/sing-up.component';
import { CartComponent } from './products/cart/cart.component';
import { AddProductComponent } from './products/add-product/add-product.component';


const routes: Routes = [
  { path: '', component: SignInComponent, canActivate: [authenticationGuard] },
  
  
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    
  },
  {
    path: 'sign-up',
    component: SingUpComponent
  },
  {
    path:'cart',
    component: CartComponent
  },
  {
    path: 'create-card',
    component: AddProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
