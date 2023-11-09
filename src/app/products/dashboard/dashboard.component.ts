import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { filter, fromEvent, map, switchMap, tap } from 'rxjs';
import { product } from 'src/app/core/interface/product';
import { HttpService } from 'src/app/core/service/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  productList: product[] = [];
  categories: string[] = [
    'electronics',
    "women's clothing",
    "men's clothing",
    'jewelery',
  ];

  selectedCategory: string = '';

  sortField: string = 'price'; 
  sortOrder: string = 'asc';

  // @ViewChild('search') searchQuery: ElementRef;
  constructor(
    private http: HttpService,
    private router: Router,
    private el: ElementRef
  ) {
    // this.searchQuery = this.el.nativeElement;
  }

  ngOnInit() {
    this.loadAllProductsAndSort();
    
  }

  loadProductsByCategory(category: string) {
    this.http.GetCategory(category).subscribe((res) => {
      this.productList = res;
    });
  }

  loadAllProductsAndSort() {
    this.http
      .getAllProductsAndSort(this.sortField, this.sortOrder)
      .subscribe((data) => {
        this.productList = data;
        this.sortProductList();
      });
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.loadAllProductsAndSort();
    this.sortProductList();
  }
  changeSortField(field: string) {
    this.sortField = field;
    this.loadAllProductsAndSort();
  }

  sortProductList() {
    this.productList = this.http.sortProductsByPrice(
      [...this.productList],
      this.sortOrder
    );
  }
  onProductCreated(newProduct: product) {
    this.productList.push(newProduct);
  }

  onClick(status: 'DELETE' | 'VISIT', id: number) {
    status === 'DELETE' ? this.deleteProduct(id) : this.gotoDetails(id);
    // debugger
  }

  gotoDetails(productId: number) {
    this.router.navigate([`main/products/${productId}`]);
  }
   

  // Delete Product func

  deleteProduct(id: number) {
    this.http.deleteProduct(id).subscribe((res) => {});
  }

  scrollToTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }



  // ngAfterViewInit() {
  //   fromEvent<KeyboardEvent>(this.searchQuery.nativeElement, 'keyup')
  //     .pipe(
  //       map((event: KeyboardEvent) => event.target as HTMLInputElement),
  //       map((target) => target.value),
  //       switchMap((value) => this.http.searchBykey(value))
  //     )
  //     .subscribe((res) => {

  //       this.productList = res;
  //     });
  // }



  
  // upateProduct(val: string, id: number) {
  //   this.http.updateProduct(id, val).subscribe((result) => {
  //     alert('Successfully Updated');
  //     console.log(result);
  //   });
  // }
}
