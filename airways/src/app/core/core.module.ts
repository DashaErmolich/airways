import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SharedModule } from '../shared/shared.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { StepperComponent } from './components/stepper/stepper.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent,
    StepperComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule { }
