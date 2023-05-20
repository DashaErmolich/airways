import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { LoginTabComponent } from './components/login-tab/login-tab.component';
import { SignUpTabComponent } from './components/sign-up-tab/sign-up-tab.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthDialogComponent,
    LoginTabComponent,
    SignUpTabComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
})
export class AuthModule { }
