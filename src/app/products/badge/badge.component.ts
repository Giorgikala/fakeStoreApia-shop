import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { CartService } from 'src/app/core/service/cart.service';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
})
export class BadgeComponent implements OnInit {
  amount$: Observable<{id: number, amount: number}[]>
  
  constructor(private cartServcie: CartService) {
    this.amount$ = this.cartServcie.Cart$.asObservable().pipe(
      tap((data) => console.log('Data received', data))

    );

    
  }

  ngOnInit() {}
}
