import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { IUser } from '../login/login';
import { LoginService } from '../login/login.service';
import { IOrder } from '../orders/order';
import { Orderservice_api } from '../orders/order.service';
import { ProfileService } from './profile.Service';
import { SuccessEnum } from '../Shared/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  uid : any;
  userdetail!: IUser;
  orderdetail!: IOrder[];
  deleteResponse! : string;
  childcomponent: string = "profile";
  upresponce!: any;

  constructor(private profileService: ProfileService,
              private loginService: LoginService,
              private orderService: Orderservice_api,
              private router:Router,
              private formBuilder: FormBuilder) { }

  
  userform: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initilizeformgroup();

    this.uid = this.loginService.getLoggedInUser();
    this.profileService.getUserDetail(this.uid).subscribe({
      next: userdetail => {
        this.userdetail = userdetail;
        console.log('data', this.userdetail);
        this.userform.setValue({
          userId: this.uid,
          name: this.userdetail.name,
          email: this.userdetail.email,
          address: this.userdetail.address,
          mobileNo: this.userdetail.mobileNo,
          roleId: this.userdetail.roleId,
          password: this.userdetail.password
        })

      }
    });  

    this.initilizeformgroup();


    this.orderService.getOrdersByUserId(this.uid).subscribe({
      next: orderdetail => {
        this.orderdetail = orderdetail;
        console.log('data', this.orderdetail);

      }
    });  

  
  }

  initilizeformgroup(){
    this.userform = this.formBuilder.group({
      userId: [undefined],
      name: [undefined],
      email: [undefined],
      address: [undefined],
      mobileNo: [undefined],
      roleId: [undefined],
      password: [undefined]
    })

  }


  updateProfile(){
    // console.log('Form value', this.userform.value);
    this.loginService.updateUserProfile(this.uid, this.userform.value).subscribe({
      next: (upresponce) => {
        this.upresponce = upresponce;
        if (this.upresponce.message === SuccessEnum.message ) {
          // this.router.navigate(['']);
          alert("Profile Updated Successfully");
          window.location.reload();
          // this.router.navigate(['/profile/', this.product.productId]);

        }
        else {
          alert("Some Error occured");
          // this.router.navigate(['/']);
        }
      }
    })
  }


  childToggle(value: string){
    this.childcomponent = value;
    // this.router.navigate(['./profile']);
    
  }


  deleteorder(id:any) {
    this.orderService.deleteOrder(id).subscribe({
      next: deleteResponse => {
        this.deleteResponse = deleteResponse;
        window.location.reload();
        // this.childToggle('order');
      }

    })
  }

}
