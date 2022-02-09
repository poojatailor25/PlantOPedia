import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUser } from "../login/login";

@Injectable({
    providedIn: 'root'
  })

export class ProfileService {


    private userUrl = "https://localhost:7258/api/user";
    
    constructor(private http: HttpClient) {}


    getUserDetail(uid : any ) : Observable<IUser> {
        return this.http.get<IUser>(this.userUrl + "/" + uid);

    }
}