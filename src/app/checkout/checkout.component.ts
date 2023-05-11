import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { cart, order } from 'src/data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;

  constructor(private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.product.currentCart().subscribe((res) => {
      let price = 0;
      this.cartData = res;
      res.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.totalPrice = price + price / 10 + 100 - price / 10;
      console.log(this.totalPrice);
    });
  }

  orderNow(custData: { email: string; address: string; contact: string }) {
    console.log(custData);

    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (this.totalPrice) {
      let orderData: order = {
        ...custData,
        totalPrice: this.totalPrice,
        userId,
        id: undefined,
      };

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 7000);
      });

      this.product.orderNow(orderData).subscribe((res) => {
        if (res) {
          this.orderMsg = 'Your Order Has Been Placed';
          setTimeout(() => {
            this.router.navigate(['/my-order']);
            this.orderMsg = undefined;
          }, 4000);
        }
      });
    }
  }
}
