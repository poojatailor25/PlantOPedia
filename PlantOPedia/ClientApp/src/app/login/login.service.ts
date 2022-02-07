import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { isNotNullOrUndefine } from "../Shared/methods";
import { IUser } from "./login";

@Injectable({
  providedIn: "root"
})

export class LoginService {

  private loginUrl: string = "https://localhost:7258/api/login";

  constructor(private http: HttpClient) { }

  loggedIn!: string ;
  // userName: string = '';

  checkLogin(loginObj: any): Observable<IUser> {
    return this.http.post<IUser>(this.loginUrl, loginObj);
  }

  getLoggedInUser(): string | null {
    return localStorage.getItem('userId');
  }

  getLoggedInUserType(): string | null {
    return localStorage.getItem('roleType');
  }

  getLoggedInUserName(): string | null {
    return localStorage.getItem('userName')
  }

  
  isUserLoggedIn(): boolean {
    // this.loggedIn = JSON.stringify(localStorage.getItem('userId'));
    if(isNotNullOrUndefine(localStorage.getItem('userId')))
    {
      return true;
    }
    else{
      return false;
    }
  }



}
