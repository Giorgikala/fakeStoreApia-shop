import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProductCardComponent } from '../products/product-card/product-card.component';
import { DashboardComponent } from '../products/dashboard/dashboard.component';
import { ProductDetailsComponent } from '../products/product-details/product-details.component';
import { TruncatePipe } from '../core/pipes/truncate.pipe';

import { HeaderComponent } from '../header/header.component';
import { MainComponent } from './main.component';

import { AppRoutingModule } from '../app-routing.module';
import { MainRoutingModule } from './main.routing.module';
import { CartComponent } from '../products/cart/cart.component';
import { BadgeComponent } from '../products/badge/badge.component';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { FooterComponent } from '../footer/footer.component';
import { AddProductComponent } from '../products/add-product/add-product.component';





@NgModule({
  declarations: [		
      MainComponent,
      HeaderComponent,
      TruncatePipe,
      ProductCardComponent,
      ProductDetailsComponent,
      DashboardComponent,
      CartComponent,
      BadgeComponent,
      FooterComponent,
      AddProductComponent
      


      
   ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MainRoutingModule,
    GooglePayButtonModule
  ],
  exports: [HeaderComponent]
})
export class MainModule { }
