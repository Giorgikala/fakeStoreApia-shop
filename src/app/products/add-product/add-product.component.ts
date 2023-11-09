import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { product } from 'src/app/core/interface/product';
import { HttpService } from 'src/app/core/service/http.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup
  @Output() productCreated = new EventEmitter<product>();
  
  constructor(private httpService: HttpService, private formBuilder: FormBuilder) { }




  ngOnInit() {

    this.productForm = this.formBuilder.group({
      id: ['', Validators.required],
      quantity: ['', Validators.required],
      title: ['', [Validators.required]],
      image : ['https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg', Validators.required],
      category: ['',],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0.01)]]
      
     })
    }
    onSubmit() {
      
      if (this.productForm.valid) {
        const productData = this.productForm.value;
        this.httpService.createProduct(productData).subscribe(
          (response) => {
            alert('Product added successfully')
            this.productCreated.emit(productData);
            console.log('Product added successfully:', response);
          },
          (error) => {
            alert('Error adding product')
            console.error('Error adding product:', error);
          }
        );
      }
    }

  
  }
  
  
  
