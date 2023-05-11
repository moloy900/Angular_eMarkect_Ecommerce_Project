import { Component, OnInit } from '@angular/core';
import { cart, product } from 'src/data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productDetails: product | undefined;
  productQualtity: number = 1;
  proProducts: product[] | undefined;
  trandyProducts: product[] | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.propularProducts().subscribe((res) => {
      console.log(res);

      this.proProducts = res;
    });
    this.productService.trendyProducts().subscribe((res) => {
      this.trandyProducts = res;
    });
  }
}
