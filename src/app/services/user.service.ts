import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { logIn, signUp } from 'src/data-type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000/users';

  inValidUserAuth = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private route: Router) {}

  userSignup(user: signUp) {
    return this.http
      .post(this.url, user, { observe: 'response' })
      .subscribe((res) => {
        console.log(res);
        if (res) {
          localStorage.setItem('user', JSON.stringify(res.body));
          this.route.navigate(['/']);
        }
      });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.route.navigate(['/']);
    }
  }

  userLogin(data: logIn) {
    return this.http
      .get<signUp[]>(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((res) => {
        if (res && res.body?.length) {
          this.inValidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(res.body[0]));
          this.route.navigate(['/']);
        } else { 
          this.inValidUserAuth.emit(true);
        }
      });
  }
}
