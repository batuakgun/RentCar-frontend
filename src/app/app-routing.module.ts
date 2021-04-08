import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AddCarImageComponent } from './components/add-car-image/add-car-image.component';
import { AllListComponent } from './components/all-list/all-list.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorComponent } from './components/color/color.component';

import { CustomerComponent } from './components/customer/customer.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';



const routes: Routes = [
  {path:"", pathMatch:"full", component:HomepageComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/details/:carId", component:CarDetailsComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:CarComponent},
  {path:"car/add",component:CarAddComponent},
  {path:"car/addimage/:id",component:AddCarImageComponent},
  {path:"car/update/:id",component:CarUpdateComponent},
  {path:"cars/filter/brand/:selectedBrandId/color/:selectedColorId",component:CarComponent},
  {path:"cars/color/:colorId" , component:ColorComponent},

  {path:"brands", component:BrandComponent},
  {path:"brand/add",component:BrandAddComponent},
  {path:"brand/update/:brandId",component:BrandUpdateComponent},
  {path:"brandlist",component:BrandListComponent},

  {path:"colors", component:ColorComponent},
  {path:"color/add",component:ColorAddComponent},
  {path:"color/update/:colorId",component:ColorUpdateComponent},
  
  {path:"payment/:rental",component:PaymentComponent},
  
  {path:"all/list",component:AllListComponent},
  
  {path:"user/edit",component:EditUserComponent},
  
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  
  {path:"rentcar/aboutus" , component:AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
