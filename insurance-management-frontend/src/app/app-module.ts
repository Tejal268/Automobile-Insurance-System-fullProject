import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';

import { AppRoutingModule } from './app-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { OfficerDashboard } from './components/officer-dashboard/officer-dashboard';
import { UserDashboard } from './components/user-dashboard/user-dashboard';
import { Claim } from './components/claim/claim';

import { Policy } from './components/policy/policy';
import { PaymentComponent } from './components/payment/payment';
import { ProposalComponent } from './components/proposal/proposal';

import { Navbar } from './components/shared-layout/navbar/navbar';
import { Sidebar } from './components/shared-layout/sidebar/sidebar';


import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ProposalStatus } from './proposal-status/proposal-status';
import { OfficerPolicyList } from './officer-policy-list/officer-policy-list';
import { ManageClaims } from './manage-claims/manage-claims';
import { Addpolicies } from './components/addpolicies/addpolicies';
import { Officerhome } from './officerhome/officerhome';
import { Aboutus } from './aboutus/aboutus';
import { ResetPassword } from './reset-password/reset-password';

@NgModule({
  declarations: [
    
  
  
    
  
    
    ManageClaims,
                                    Aboutus,
                                    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    App,
    OfficerPolicyList,
    Addpolicies,
  Officerhome,

    // Standalone components (Angular 14+)
    Login,
    Register,
    OfficerDashboard,
    UserDashboard,
    Claim,

    Policy,
    PaymentComponent,
    ProposalComponent,

    Navbar,
    Sidebar,
     ProposalStatus,
    ResetPassword,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],

})
export class AppModule { }
