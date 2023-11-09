
  export interface product {
    id:number;
    title:string;
    price:number;
    category:string;
    description: string;
    image: string;
    quantity: number;
  }

  export interface ProductList {
    limit: number;
    products: product[];
    count: number;
    total: number
}


export interface CartItem {
  product: string;
  name:string;
  price:number;
  quantity: number;
  id:number;

}
