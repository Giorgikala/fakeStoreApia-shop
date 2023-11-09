import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { product } from 'src/app/core/interface/product';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: product


  @Output() productClicked: EventEmitter<'DELETE' | 'VISIT'> = new EventEmitter();
  constructor( ) { }

  ngOnInit() {
  }

 



}
