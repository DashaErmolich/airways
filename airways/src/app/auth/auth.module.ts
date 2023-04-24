import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { LoginTabComponent } from './components/login-tab/login-tab.component';
import { SignUpTabComponent } from './components/sign-up-tab/sign-up-tab.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    AuthPageComponent,
    LoginTabComponent,
    SignUpTabComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
  ],
})
export class AuthModule { }
