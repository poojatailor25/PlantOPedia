import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { IProduct } from "./product";

@Injectable({
    providedIn:'root'
})
export class ProductService{
   
    
  private productUrl = 'https://localhost:7258/api/product';
  private productTypeUrl = 'https://localhost:7258/api/productType';

  constructor(private http:HttpClient){}

    getProducts() : Observable <IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl);
    }

  getProductTypes(): Observable<any> {
    return this.http.get<any>(this.productTypeUrl);
  }
    
    getProductById(pid : any ) : Observable<IProduct> {
        return this.http.get<IProduct>(this.productUrl + "/" + pid);

    }

    updateProduct(pid :any ,product : any) : Observable <any> {
        return this.http.put<any>(this.productUrl + "/" + pid, product );
    }

    deleteProduct(pid: any) :Observable <any> {
        return this.http.delete<any>(this.productUrl + "/" + pid);
    }

    
    addproduct(value: any):Observable <IProduct> {
      return this.http.post<IProduct>(this.productUrl, value);
    }
}
