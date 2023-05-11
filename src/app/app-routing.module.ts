import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { NopageComponent } from './nopage/nopage.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SelerHomeComponent } from './seler-home/seler-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrderComponent } from './my-order/my-order.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller-auth', component: SellerAuthComponent },
  { path: 'seller-home', component: SelerHomeComponent, canActivate:[AuthGuard] },
  {path:'seller-add-products',component:SellerAddProductComponent, canActivate:[AuthGuard]},
  {path:'seller-update-product/:id', component:SellerUpdateProductComponent, canActivate:[AuthGuard]},
  {path:'search/:query',component:SearchComponent},
  {path:'details/:productId',component:ProductDetailsComponent},
  {path:'user-auth',component:UserAuthComponent},
  {path: 'cart-page',component:CartPageComponent},
  {path:'checkout', component:CheckoutComponent},
  {path:'my-order', component:MyOrderComponent},
  // {path:'**',component:NopageComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
