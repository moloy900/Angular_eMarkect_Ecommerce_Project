import { Component, OnInit } from '@angular/core';
import { SellerService } from '../service/seller.service';
import { Router } from '@angular/router';
import { logIn, signUp } from 'src/data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  showLogin = true;
  authError: string = '';
  constructor(private sellerservice: SellerService, private router: Router) {}

  ngOnInit(): void {
    this.sellerservice.reloadSeller();
  }

  signUp(data: signUp): void {
    this.sellerservice.userSignUp(data);
  }

  login(data: logIn): void {
    this.authError = '';
    this.sellerservice.userLogin(data);
    this.sellerservice.reloadSeller();
    this.sellerservice.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email or Password is not correct';
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }
  openSignup() {
    this.showLogin = false;
  }
}
