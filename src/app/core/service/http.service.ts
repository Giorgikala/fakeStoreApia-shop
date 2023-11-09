import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductList, product } from '../interface/product';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { BASE_URL } from 'src/app/Constants/constats';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  

  constructor(private http: HttpClient) {}

  GetProduct(): Observable<product[]> {
    return this.http.get<any>(`${BASE_URL}/products`);
  }
  GetCategory(category: string): Observable<product[]> {
    return this.http.get<any>(`${BASE_URL}/products/category/${category}`);
  }
  createProduct(item: product): Observable<product> {
    return this.http.post<product>(`${BASE_URL}/products`, item);
  }


 

  GetProductById(id: number): Observable<product> {
    
    return this.http.get<product>(`${BASE_URL}/products/${id}`);
  }


    // Delete Product 

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/products/${id}`);
  }

  public addCart(id: number): Observable<any> {
    return this.http.get(`${BASE_URL}/${id}`);
  }
  getAllProductsAndSort(
    sortField: string,
    sortOrder: string
  ): Observable<product[]> {
    const apiUrl = `${BASE_URL}/products?_sort=${sortField}&_order=${sortOrder}`;
    return this.http.get<any[]>(apiUrl);
  }

  sortProductsByPrice(products: product[], sortOrder: string): product[] {
    return products.sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;
      if (sortOrder === 'asc') {
        return priceA - priceB;
      } else if (sortOrder === 'desc') {
        return priceB - priceA;
      }
      return 0;
    });
  }
  

  //  Update Product


  // updateProduct(id: number, updatedValue: string) {
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.put(`${this.apiUrl}/products/${id}`, {
  //       description: updatedValue
  //   }, { headers })
  // }


      //  Search method with HttpParams

  // public searchBykey(key: string): Observable<product[]> {
  //   const params = new HttpParams();
  //   params.set('q', key);
  //   console.log(params);

  //   return this.http
  //     .get<ProductList>(`${BASE_URL}/search?q=${key}`)
  //     .pipe(map((result) => result.products));
  // }
}
