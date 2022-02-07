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
    FooterComponent
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
      {path: 'product',component:ProductsComponent},
      {path:'product/:id',component:ProductDetailComponent},
      {path: 'products/:id', component:ProductUpdateComponent,canActivate:[AuthGuard]},
      {path:'addproduct',component:AddProductComponent,canActivate:[AuthGuard],canDeactivate:[CanDeactivateGuard]}
    ])
  ],
  providers: [AuthGuard,CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
