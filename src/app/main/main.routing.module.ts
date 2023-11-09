import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { DashboardComponent } from '../products/dashboard/dashboard.component';


import { ProductDetailsComponent } from '../products/product-details/product-details.component';
import { SingUpComponent } from '../auth/sing-up/sing-up.component';
import { authGuard } from '../core/guards/auth.guard';
import { AddProductComponent } from '../products/add-product/add-product.component';
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'products',
        component: DashboardComponent 
      },
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'products/:id',
        component: ProductDetailsComponent 

      },
      {
        path: 'sign-up',
        component: SingUpComponent
      },
     
      
     
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule { }