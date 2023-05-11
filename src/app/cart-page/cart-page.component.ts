import { Component, OnInit } from '@angular/core';
import { cart, priceSummery, product } from 'src/data-type';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;

  priceSummery: priceSummery = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };

  constructor(private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadDetails();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

  removeToCart(cartId: number | undefined) {
    cartId &&
      this.cartData &&
      this.product.removeToCart(cartId).subscribe((res) => {
        this.loadDetails();
      });
  }

  loadDetails() {
    this.product.currentCart().subscribe((res) => {
      this.cartData = res;
      let price = 0;
      res.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.priceSummery.price = price;
      this.priceSummery.discount = price / 10;
      this.priceSummery.tax = price / 10;
      this.priceSummery.delivery = 100;
      this.priceSummery.total = price + price / 10 + 100 - price / 10;
      console.log(this.priceSummery);

      if (!this.cartData.length) {
        this.router.navigate(['/']);
      }
    });
  }
}
