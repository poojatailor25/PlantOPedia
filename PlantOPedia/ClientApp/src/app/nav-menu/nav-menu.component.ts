import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  loggedIn : any;
  roleType!:string |null;
  roleFlag!: boolean;
  uName: any;
  totalItems: number = 0;
  istotalItems: boolean | undefined;
  uId: any;
  cartresponse!: Array<any>;
  

  constructor (private loginService : LoginService,
                private router : Router,
                private cartService:CartService){}

  ngOnInit(): void {
    this.loggedIn = this.loginService.isUserLoggedIn();
    this.uName = this.loginService.getLoggedInUserName(); 
    this.roleType = this.loginService.getLoggedInUserType(); 
    this.uId =this.loginService.getLoggedInUser();
    
    if(this.roleType == 'Admin'){
        this.roleFlag = true;
    }
    else {
        this.roleFlag = false;
        
    }
    this.cartService.getCartProductById(this.uId).subscribe({
      next: cartresponse => {
        this.cartresponse = cartresponse;
        this.totalItems = this.cartresponse.length;
        this.totalItems>0 ? this.istotalItems = true : this.istotalItems = false;
      }
      });
  }
  


  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  removeLoggedInUserDetails(): void {
    localStorage.clear();
    // this.reloadCurrentComponent();
    // this.router.navigate(['']);
    window.location.replace('');

  }

}
