import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ICart } from "../cart/cart";
import { CartService } from "../cart/cart.service";
import { LoginService } from "../login/login.service";
import { isNotNullOrUndefine } from "../Shared/methods";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product!: IProduct;
  deleteResponse: any;
  roleType!: string | null;
  roleFlag!: Boolean;
  cartObj!: ICart;
  id: any;
  uId: any;
  cartResponse: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private ProductService: ProductService,
    private loginService: LoginService,
    private cartService: CartService) { }

  productDetail(pid: any) {
    this.ProductService.getProductById(pid).subscribe({
      next: (product) => {
        this.product = product;
        console.log("Getting Product detail", this.product);
      }
    })
  }
  ngOnInit(): void {
    this.uId = this.loginService.getLoggedInUser();
    this.id = this.route.snapshot.paramMap.get('id');
    this.roleType = this.loginService.getLoggedInUserType();
    if (this.roleType == 'Admin') {
      this.roleFlag = true;
    }
    else {
      this.roleFlag = false;
    }
    this.productDetail(this.id);

  }
  addIncart() {
    this.cartObj = {
      productId: this.id,
      userId: this.uId
    }

    this.cartService.addToCart(this.cartObj).subscribe({
      next: cartResponse => {
        this.cartResponse = cartResponse;
        alert("Added to your Cart");
      }
    })
  }


  deleteProduct(pid: any) {
    this.ProductService.deleteProduct(pid).subscribe({
      next: deleteResponse => {
        this.deleteResponse = deleteResponse;
        console.log("Delete Success", this.deleteResponse)

      }

    })
  }
  isUserLoggedIn(): boolean {
    if (isNotNullOrUndefine(localStorage.getItem('userId'))) {
      return true;
    }
    else {
      window.alert("you are not loggedin");
      this.router.navigate(['./login']);
      return false;
    }
  }

  


}