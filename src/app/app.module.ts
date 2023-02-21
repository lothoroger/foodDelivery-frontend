import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './component/register/register.component';
import { PasswordComponent } from './component/password/password.component';
import { AdministratorComponent } from './component/administrator/administrator.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CustomersComponent } from './component/customers/customers.component';
import { DbService } from './services/db.service';
import { AuthService } from './services/auth.service';
import { PaymentComponent } from './component/payment/payment.component';
import { CuisinesComponent } from './component/cuisines/cuisines.component';
import { CartComponent } from './component/cart/cart.component';
import { OrdersComponent } from './component/orders/orders.component';
import { AuthGuard } from './guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    PasswordComponent,
    LoginComponent,
    AdministratorComponent,
    CustomersComponent,
    PaymentComponent,
    CuisinesComponent,
    CartComponent,
    OrdersComponent

  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      countDuplicates: true,
      tapToDismiss: true
    })
  ],
  providers: [AuthService, DbService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
