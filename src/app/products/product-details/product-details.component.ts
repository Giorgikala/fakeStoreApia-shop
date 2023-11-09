import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/core/interface/product';
import { CartService } from 'src/app/core/service/cart.service';
import { HttpService } from 'src/app/core/service/http.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  rt!: number
  product!: product
  cart: FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpService, private CartService: CartService) { 
    this.rt = Number(this.route.snapshot.paramMap.get('id'))
    this.cart = new FormGroup({
      amount: new FormControl(null, [Validators.required, Validators.max(5), Validators.min(1)]),
      productId: new FormControl(this.rt),
      category: new FormControl('')
    })
    
  }


  addToCart(){
    const cartItems = this.CartService.Cart$.getValue()
    const {productId, amount} = this.cart.value
    cartItems.push({id : productId, amount: amount})
    this.CartService.Cart$.next(cartItems)
    
    
  }
  

  ngOnInit() {
    this.getSingleProduct(this.rt)
  }
  getSingleProduct(id: number){
    this.http.GetProductById(id).subscribe((data)=>{
      this.product = data
      this.cart.get('rt')?.setValue(data.id)
      this.cart.get('category')?.setValue(data.category)
     
      
    })
  }
  changeOrderNumber(status: '-'| '+'){
    const quantity = this.cart.get('amount') as FormControl

    if(status === '-'){
      quantity.patchValue(quantity.value - 1)
    }
    else{

      quantity.patchValue(quantity.value + 1)
    }
  }





}
