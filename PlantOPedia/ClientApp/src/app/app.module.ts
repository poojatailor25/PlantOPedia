import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './login/login.component';
import { Orderlistcomponent } from './orders/order-list.component';
import { AddOrderComponent } from './AddOrder/add-order.component';
import { ProductsComponent } from './products/product-list.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { AddProductComponent } from './AddProduct/add-product.component';
import { ProductUpdateComponent } from './products/product-update.component';
import { AuthGuard } from './auth.guard';
import { FooterComponent } from './footer/footer.component';
import { CanDeactivateGuard } from './form-auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { CurrencyPipe } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    Orderlistcomponent,
    AddOrderComponent,
    ProductsComponent,
    AddProductComponent,
    ProductDetailComponent,
    ProductUpdateComponent,
    FooterComponent,
    ProfileComponent,
    SignupComponent,
    CartComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, outlet:"home", pathMatch: 'full' },
      { path: 'order', component: Orderlistcomponent, canActivate:[AuthGuard] },
      { path: 'addorder/:id', component: AddOrderComponent, canActivate:[AuthGuard],canDeactivate:[CanDeactivateGuard] },
      { path: 'login', component: LoginComponent },
      {path: 'signup', component: SignupComponent},
      {path: 'product',component:ProductsComponent},
      {path:'product/:id',component:ProductDetailComponent},
      {path: 'products/:id', component:ProductUpdateComponent,canActivate:[AuthGuard]},
      {path:'addproduct',component:AddProductComponent,canActivate:[AuthGuard],canDeactivate:[CanDeactivateGuard]},
      {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
      {path: 'cart', component: CartComponent, canActivate:[AuthGuard]}
    ])
  ],
  providers: [AuthGuard,CanDeactivateGuard, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
