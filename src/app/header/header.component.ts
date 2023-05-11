import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/data-type';
import { ProductService } from '../service/product.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: product[] | undefined;
  cartItem = 0;
  constructor(private route: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          
            let sellerStorage = localStorage.getItem('seller');
            let sellerData = sellerStorage && JSON.parse(sellerStorage)[0];
            this.sellerName = sellerData.name;
            this.menuType = 'seller';
          
        } else if (localStorage.getItem('user')) {
          let userStorage = localStorage.getItem('user');
          let userData = userStorage && JSON.parse(userStorage);
          this.userName = userData.uname;
          this.menuType = 'user';
          this.productService.getCartList(userData.id)
        } else {
          this.menuType = 'default';
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItem = JSON.parse(cartData).length;
    }
    this.productService.cartData.subscribe((res) => {
      this.cartItem = res.length;
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
    this.productService.cartData.emit([]);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;

      this.productService.searchProducts(element.value).subscribe((res) => {
        if (res.length > 5) {
          res.length = 5;
        }
        this.searchResult = res;
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(val: string) {
    console.log(val);
    this.route.navigate([`search/${val}`]);
  }

  redirecttodetails(id: number) {
    this.route.navigate(['/details/' + id]);
  }
}
