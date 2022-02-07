import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "../login/login.service";
import { isNotNullOrUndefine } from "../Shared/methods";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector:'product-detail',
    templateUrl:'./product-detail.component.html',
    styleUrls:['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
    pageTitle: string ='Product Detail';
    product!:IProduct;
    deleteResponse: any;
    roleType!: string | null;
    roleFlag!: Boolean;


    constructor(private route:ActivatedRoute,
                private router:Router,
                private ProductService:ProductService,
                private loginService: LoginService) { }

    productDetail(pid:any){
        this.ProductService.getProductById(pid).subscribe({
            next:(product)=>{
                this.product=product;
                console.log("Getting Product detail",this.product);
            }
        })
    }
    ngOnInit(): void {
        const id =this.route.snapshot.paramMap.get('id');
        this.roleType = this.loginService.getLoggedInUserType(); 
        if(this.roleType == 'Admin'){
            this.roleFlag = true;
        }
        else {
            this.roleFlag = false;
        }
        this.productDetail(id);
        
    }
    deleteProduct(pid:any) {
        this.ProductService.deleteProduct(pid).subscribe({
          next: deleteResponse => {
            this.deleteResponse = deleteResponse;
            console.log("Delete Success",this.deleteResponse)
    
          }
    
        })
    }
    isUserLoggedIn(): boolean {
        if(isNotNullOrUndefine(localStorage.getItem('userId')))
        {
          return true;
        }
        else{
          window.alert("you are not loggedin");
          this.router.navigate(['./login']);
          return false;
        }
      }
    

   
}