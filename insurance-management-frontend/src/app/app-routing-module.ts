import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { UserDashboard } from './components/user-dashboard/user-dashboard';
import { OfficerDashboard } from './components/officer-dashboard/officer-dashboard';
import { ProposalComponent } from './components/proposal/proposal';
import { Claim } from './components/claim/claim';

import { Policy } from './components/policy/policy';
import { PaymentComponent } from './components/payment/payment';

import { OfficerRegistration } from './officerregistration/officerregistration';

import { AuthGuard } from './guards/auth-guard';
import {RegisterOfficer} from './components/register-officer/register-officer';
import { ProposalStatus } from './proposal-status/proposal-status';
import { OfficerPolicyList } from './officer-policy-list/officer-policy-list';
import { ManageClaims } from './manage-claims/manage-claims';
import { Addpolicies } from './components/addpolicies/addpolicies';
import { Officerhome } from './officerhome/officerhome';
import { ResetPassword } from './reset-password/reset-password';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'officer-register', component: RegisterOfficer },
  { path: 'user-dashboard', component: UserDashboard, canActivate: [AuthGuard] },
  { path: 'proposal', component: ProposalComponent, canActivate: [AuthGuard] },
  { path: 'claim', component: Claim, canActivate: [AuthGuard] },
  { path: 'policy', component: Policy, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  {path:'proposal-status',component:ProposalStatus,canActivate: [AuthGuard]},
  { path: 'officer-dashboard', component: OfficerDashboard, canActivate: [AuthGuard] },
  { path: 'officer-home', component: Officerhome, canActivate: [AuthGuard] },
  {path: 'all-policies',component: OfficerPolicyList},
  {path: 'add-policies',component: Addpolicies },
  {path: 'manage-claims',component: ManageClaims},
  { path: 'forgot-password', component: ResetPassword },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
