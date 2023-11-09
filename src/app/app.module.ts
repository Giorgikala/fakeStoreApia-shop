import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './auth/sign-in/sign-in.component';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServerInterceptor } from './core/service/interceptors.service';









@NgModule({
  declarations: [				
    AppComponent,
      SignInComponent,
      
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    
    
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: ServerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
