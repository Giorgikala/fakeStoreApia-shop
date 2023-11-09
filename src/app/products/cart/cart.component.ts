import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, forkJoin, switchMap } from 'rxjs';
import { product } from 'src/app/core/interface/product';
import { CartService } from 'src/app/core/service/cart.service';
import { HttpService } from 'src/app/core/service/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cartProducts : product[] = []
  cartProductsSubs$!: Subscription

  totalCost = 0;
  totalQuantity = 0;
  paymentRequest!: google.payments.api.PaymentDataRequest;
  constructor(
     private CartService: CartService,
     private HttpService: HttpService) {
 

  }


  getCartProducts(data: {id: number, amount: number}[]) {
    const observables: Observable<product>[] = [];
    data.map(i=> observables.push(this.HttpService.GetProductById(i.id)));
    return forkJoin(observables)

  }
  calculateItemTotal(item: any): number {
    debugger
    const price = item.price || 0
    const amount = this.getQuantity(item.id)
    
    return price * amount
  }



 
  getQuantity(productId: number): number {
    const item = this.CartService.Cart$.value.find(i => i.id === productId);
    return item ? item.amount : 0;
  }

  
   
  removeFromCart(id: number) {
    this.CartService.removeFromCart(id);
    this.HttpService.GetProductById(id)
   
    
  }

  ClearAll(): void{
    this.CartService.ClearAll()
    this.cartProducts = []

  }


 
  ngOnInit(): void  {
    this.paymentRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["AMEX", "VISA", "MASTERCARD"]
          },
          tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
              gateway: "example",
              gatewayMerchantId: "exampleGatewayMerchantId"
            }
          }
        }
      ],
      merchantInfo: {
        merchantId: "12345678901234567890",
        merchantName: "Demo Merchant"
      },
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPriceLabel: "Total",
        totalPrice: "100.00",
        currencyCode: "USD",
        countryCode: "US"
      }
    };

     this.cartProductsSubs$ = this.CartService.Cart$.pipe(
      switchMap(res => this.getCartProducts(res))
    ).subscribe(data => {
      this.cartProducts = data

      const total = this.CartService.calculateTotal();
      this.totalCost = total.totalCost;
      this.totalQuantity = total.totalQuantity;
     
      
    })
    
  }
 
  ngOnDestroy() {
    this.cartProductsSubs$.unsubscribe()
  }


 

  

  onLoadPaymentData(event:any) {
    console.log("load payment data", event.detail);
  }



  

}
