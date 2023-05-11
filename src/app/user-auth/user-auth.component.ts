import { Component, OnInit } from '@angular/core';
import { signUp, logIn, product, cart } from 'src/data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = '';
  constructor(
    private userservice: UserService,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    this.userservice.userAuthReload();
  }

  signUp(data: signUp) {
    this.userservice.userSignup(data);
  }

  login(data: logIn) {
    console.log(data);
    this.userservice.userLogin(data);
    this.userservice.inValidUserAuth.subscribe((res) => {
      console.log(res);
      if (res) {
        this.authError = 'Please Enter Valid User Details';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }

  openLogin() {
    this.showLogin = false;
  }

  openSignUp() {
    this.showLogin = true;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      cartDataList.forEach((products: product, index) => {
        let cartData: cart = {
          ...products,
          productId: products.id,
          userId
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((res) => {
            if (res) {
              console.log('Item Stored in DB');
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
  }
}
