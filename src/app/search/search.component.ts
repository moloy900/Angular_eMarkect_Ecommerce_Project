import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
searchResult:undefined|product[]
  constructor(private activateRoute:ActivatedRoute, private productService:ProductService){}

  ngOnInit(): void {
    let query = this.activateRoute.snapshot.paramMap.get('query');
    console.log(query)
    query && this.productService.searchProducts(query).subscribe((res)=>{
      this.searchResult=res
    })
  }

}
