import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { logIn, signUp } from 'src/data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerSign=new BehaviorSubject<boolean>(false);
  isLoginError=new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private route:Router) {}

  url = 'http://localhost:3000/seller';
  userSignUp(data: signUp) {
    this.http.post(this.url, data,
      {observe:'response'}).subscribe((res)=> {
        this.isSellerSign.next(true),
        localStorage.setItem('seller',JSON.stringify(res.body)),
        this.route.navigate(['seller-home'])
      });
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerSign.next(true);
      this.route.navigate(['seller-home']);
    }
  }

  userLogin(data:logIn){
    console.log(data);
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((res:any)=>{
      console.log(res);
      if(res && res.body && res.body.length){
        console.log("User login");
        localStorage.setItem('seller',JSON.stringify(res.body)),
        this.route.navigate(['seller-home'])
      }else{
        console.log("user not login");
        this.isLoginError.emit(true)
      }
    })
    
  }
}
