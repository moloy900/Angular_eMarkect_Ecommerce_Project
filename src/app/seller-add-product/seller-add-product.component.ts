import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  constructor(private productservice: ProductService, private route: Router) {}

  ngOnInit(): void {}

  addProductsubmit(data: product) {
    this.productservice.addProduct(data).subscribe((res) => {
      console.log(res);

      if (res) {
        this.addProductMessage = 'Product is Successfully Added';
      }
      setTimeout(() => {
        this.addProductMessage = undefined;
        this.route.navigate(['seller-home']);
      }, 3000);
    });
  }
}
