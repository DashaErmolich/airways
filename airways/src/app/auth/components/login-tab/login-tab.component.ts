import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { CustomFormValidatorErrorsEnum } from 'src/app/core/constants/custom-form-validator-errors.enum';
import { FormValidatorService } from 'src/app/core/services/form-validator.service';
import { AppState } from 'src/app/redux/state.models';
import { formValidationErrorsMessages } from 'src/assets/form-validation-errors-messages';
import { Observable, Subscription } from 'rxjs';
import { selectError } from 'src/app/redux/selectors/app.selectors';
import * as AuthActions from '../../../redux/actions/app.actions';

@Component({
  selector: 'app-login-tab',
  templateUrl: './login-tab.component.html',
  styleUrls: ['./login-tab.component.scss'],
})
export class LoginTabComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;

  errorsMessages = formValidationErrorsMessages.authForm;

  customErrors = CustomFormValidatorErrorsEnum;

  isPasswordHidden = true;

  error$!: Observable<string | null>;

  private errorMessage!: string | null;

  private errorSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginTabComponent>,
    private formValidatorService: FormValidatorService,
    private store$: Store<AppState>,
  ) {
    this.error$ = this.store$.pipe(select(selectError));
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.formValidatorService.letterCaseValidator(),
          this.formValidatorService.numberValidator(),
          this.formValidatorService.specialCharValidator(),
        ],
      ],
    });

    this.errorSubscription = this.error$.subscribe((res) => {
      this.errorMessage = res;
    });
  }

  ngOnDestroy(): void {
    this.loginForm.reset();
    this.errorSubscription.unsubscribe();
  }

  onSubmit(): void {
    this.store$.dispatch(AuthActions.login({ user: this.loginForm.value }));
    // eslint-disable-next-line no-debugger
    // debugger;
    // if (this.errorMessage === null) {
    //   this.dialogRef.close(this.loginForm.value);
    // }
  }
}
