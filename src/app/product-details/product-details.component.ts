import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from 'src/data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productDetails: product | undefined;
  productQualtity: number = 1;
  removeCart = false;
  cartData: product | undefined;

  constructor(
    private activateroute: ActivatedRoute,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    let productId = this.activateroute.snapshot.paramMap.get('productId');
    console.warn(productId);

    productId &&
      this.product.getProduct(productId).subscribe((res) => {
        this.productDetails = res;
        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (item: product) => productId == item.id.toString()
          );
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
          this.product.cartData.subscribe((res) => {
            let items = res.filter(
              (item: product) =>
                productId?.toString() === item.productId?.toString()
            );
            if (items.length) {
              this.cartData = items[0];
              this.removeCart = true;
            }
          });
        }
      });
  }

  handleQuality(val: string) {
    if (this.productQualtity < 20 && val === 'plus') {
      this.productQualtity = this.productQualtity + 1;
    } else if (this.productQualtity > 1 && val === 'min') {
      this.productQualtity = this.productQualtity - 1;
    }
  }

  addtoCart() {
    if (this.productDetails) {
      this.productDetails.quantity = this.productQualtity;
      if (!localStorage.getItem('user')) {
        this.product.localAddtoCart(this.productDetails);
        this.removeCart = true;
      } else {
        console.log('user is logged in');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;

        let cartData: cart = {
          ...this.productDetails,
          productId: this.productDetails.id,
          userId,
        };
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((res) => {
          if (res) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }

  reMoveCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemCart(productId);
    } else {
      console.warn('cartData', this.cartData);
      this.cartData &&
        this.product.removeToCart(this.cartData.id).subscribe((res) => {
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
        });
      this.removeCart = false;
    }
  }
}
