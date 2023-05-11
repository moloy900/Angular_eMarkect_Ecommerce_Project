import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { product } from 'src/data-type';
import { ProductService } from '../service/product.service';
import { SellerService } from '../service/seller.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product;
  productMessage: undefined | string;
  constructor(
    private activateroute: ActivatedRoute,
    private productservice: ProductService,
    private route: Router
  ) {}

  ngOnInit(): void {
    let productId = this.activateroute.snapshot.paramMap.get('id');
    console.log(productId);
    productId &&
      this.productservice.getProduct(productId).subscribe((data) => {
        console.log(data);
        this.productData = data;
      });
  }

  addUpdateProduct(data: product) {
    if (this.productData) { 
      data.id = this.productData.id;
    }
    this.productservice.updateProduct(data).subscribe((res) => {
      if (res) {
        this.productMessage = 'Product Successfully Updated';
      }
    });

    setTimeout(() => {
      this.productMessage = undefined;
      this.route.navigate(['seller-home']);
    }, 3000);
  }
}
