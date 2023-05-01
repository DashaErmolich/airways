import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { LoginTabComponent } from './components/login-tab/login-tab.component';
import { SignUpTabComponent } from './components/sign-up-tab/sign-up-tab.component';
import { SharedModule } from '../shared/shared.module';
import { reducers } from '../redux/reducers/app.reducers';
import { AuthEffects } from '../redux/effects/app.effects';

@NgModule({
  declarations: [
    AuthDialogComponent,
    LoginTabComponent,
    SignUpTabComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthModule { }
