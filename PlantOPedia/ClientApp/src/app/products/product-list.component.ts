import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';
import { isNotNullOrUndefine } from '../Shared/methods';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductsComponent implements OnInit {
  roleFlag!: boolean;
  roleType!:string |null;
  imageWidth = 100;
  imagefit = 'fit';
  sub!: Subscription;

  products: IProduct[] = [];
  filteredProducts: IProduct[] =[];

  constructor(private ProductService : ProductService,
              private loginService : LoginService) {
    
   }

   private _listFilter: string = '';
    
   get listFilter() : string {
     return this._listFilter;
   }
   
   set listFilter(value : string) {
     this._listFilter = value;
    //  console.log('In setter:', value);
     this.filteredProducts = this.performFilter(value);
   }
   

   
   performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleUpperCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleUpperCase().includes(filterBy));
  }
   


  ngOnInit(): void {
    this.sub=this.ProductService.getProducts().subscribe({
      next: products => {this.products = products;
        this.filteredProducts = this.products;
      }
      
    });
    console.log('In OnInit');
    this.roleType = this.loginService.getLoggedInUserType(); 
    if(this.roleType == 'Admin'){
        this.roleFlag = true;
    }
    else {
        this.roleFlag = false;
    }
  }
  
  ngAfterContentInit() {
    console.log("ngAfterContentInit called.....");
  }
  ngDestroy() {
    this.sub.unsubscribe();
    console.log('ondestroy is called......');
  }


}
