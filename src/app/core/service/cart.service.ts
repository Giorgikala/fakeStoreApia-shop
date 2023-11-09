import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { product } from '../interface/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  Cart$: BehaviorSubject<{ id: number; amount: number }[]> =
    new BehaviorSubject<{ id: number; amount: number }[]>([]);

  products: any[] = [];
  cartProducts: product[] = [];

  calculateTotal(): { totalCost: number; totalQuantity: number } {
    let totalCost = 0;
    let totalQuantity = 0;

    const cartItems = this.Cart$.value;

    for (const item of cartItems) {
      if (item.amount !== null) {
        totalCost += item.amount;
        totalQuantity++;
      }
    }

    return { totalCost, totalQuantity };
  }

  ClearAll() {
    this.Cart$.next([]);
  }

  removeFromCart(id: number) {
    const currentCart = this.Cart$.value;

    if (currentCart.length === 1 && currentCart[0].id === id) {
      this.Cart$.next([]);
    } else {
      const updatedCart = currentCart.filter((item) => item.id !== id);
      this.Cart$.next(updatedCart);
    }
  }

  constructor() {}
}
