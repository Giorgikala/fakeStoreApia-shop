import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../core/service/localstorage.service';
import { authToken } from '../Constants/constats';
import { CartService } from '../core/service/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends LocalstorageService implements OnInit {

  constructor(private route: Router, private cartService: CartService) { 
    super()
      
  }

  ngOnInit() {
    
    

  }
  navigationData: {title:string, path:string}[] = [
   
    {
      title: 'Products',
      path: '/main/products'
    },
    
  ]
  
  

  goAuth(){
    
    this.route.navigate(['sign-in'])

  }
  logOut(){
    this.removeItem(authToken)
    this.route.navigate(['/'])
  }
  

}
