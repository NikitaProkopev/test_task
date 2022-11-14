import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { Apollo } from "apollo-angular";
import { GET_USER } from "../graphql-types/user-types";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apollo: Apollo
  ) { }

  auth(login: string, password: string): Observable<User> {
    return this.apollo.query<{ login: User }>({
      query: GET_USER,
      variables: { login, password }
    }).pipe(
      map(item => {
        this.userValue = item.data.login;
        return item.data.login;
      })
    )
  }

  logout(): void {
    this.userValue = undefined;
  }

  public get userValue(): User | undefined{
    let login = sessionStorage.getItem('login');
    let password = sessionStorage.getItem('password');
    if (login && password) {
      return { login, password }
    }
    return;
  }

  public set userValue(user: User | undefined){
    if (user) {
      sessionStorage.setItem('login', user.login);
      sessionStorage.setItem('password', user.password);
    } else {
      sessionStorage.removeItem('login');
      sessionStorage.removeItem('password');
    }
  }

}

interface User{
  login: string,
  password: string
}
