import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from 'src/data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  url = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  addProduct(data: product) {
    return this.http.post(this.url, data);
  }

  ProductList() {
    return this.http.get<product[]>(this.url);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.url + `/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<product>(this.url + `/${id}`);
  }

  updateProduct(product: product) {
    return this.http.put<product>(this.url + `/${product.id}`, product);
  }

  propularProducts() {
    return this.http.get<product[]>(this.url + `/?_limit=12`);
  }

  trendyProducts() {
    return this.http.get<product[]>(this.url + `/?_limit=12`);
  }

  searchProducts(query: string) {
    return this.http.get<product[]>(this.url + `/?q=${query}`);
  }

  localAddtoCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    console.log('local:', localCart);

    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let item: product[] = JSON.parse(cartData);
      item = item.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(item));
      this.cartData.emit(item);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart/', cartData);
  }

  getCartList(userId: number) {
    return this.http
      .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((res) => {
        console.warn(res);
        if (res && res.body) {
          this.cartData.emit(res.body);
        }
      });
  }

  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }

  currentCart() {
    let userStorage = localStorage.getItem('user');
    let userData = userStorage && JSON.parse(userStorage);
    return this.http.get<cart[]>(
      'http://localhost:3000/cart?userId=' + userData.id
    );
  }

  orderNow(custData: order) {
    return this.http.post('http://localhost:3000/orders/', custData);
  }

  orderList() {
    let userStorage = localStorage.getItem('user');
    let userData = userStorage && JSON.parse(userStorage);
    return this.http.get<order[]>(
      'http://localhost:3000/orders?userId=' + userData.id
    );
  }

  deleteCartItems(cartId: number) {
    return this.http
      .delete('http://localhost:3000/cart/' + cartId, { observe: 'response' })
      .subscribe((res) => {
        if (res) {
          this.cartData.emit([]);
        }
      });
  }

  cancelOrder(orderId: number) {
    return this.http.delete('http://localhost:3000/orders/' + orderId);
  }
}
