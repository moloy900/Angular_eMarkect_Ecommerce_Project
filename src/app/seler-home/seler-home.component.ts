import { Component, OnInit } from '@angular/core';
import { product } from 'src/data-type';
import { ProductService } from '../service/product.service';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seler-home',
  templateUrl: './seler-home.component.html',
  styleUrls: ['./seler-home.component.css']
})
export class SelerHomeComponent implements OnInit{

  productList:undefined|product[];
  productMessage:undefined|string;
  icon=faTrash;
  editIcon=faEdit;
  constructor(private productservice:ProductService){}

ngOnInit(): void {
  this.getProductlist();
}

getProductlist(){
  this.productservice.ProductList().subscribe((res)=>{
    this.productList=res
    
  })
}

deleteProduct(id:number){
  this.productservice.deleteProduct(id).subscribe((result)=>{
   if(result){
    this.productMessage="Product is Successfully Deleted"
   }
  
  })
  setTimeout(() => {
    this.productMessage=undefined
   }, 3000);

   this.getProductlist()
}
}
