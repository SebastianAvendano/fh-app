import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';
import { ToastService } from '@services/customToast/toast.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzModalModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotForm!: FormGroup;
  isLoading = false;

  #auth = inject(AuthService);
  customToast = inject(ToastService);
  fb = inject(FormBuilder);
  #modal = inject(NzModalRef);

  constructor() {
    this.forgotForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  async resetPassword() {
    if (this.forgotForm.valid) {

      this.isLoading = true;
      const email = this.forgotForm.value.email;
      
      await this.#auth
        .resetPassword(email)
        .then(async () => {
          await this.customToast.showToast(
            'success',
            'Se envio un email de recuperación'
          );
        })
        .catch(() => {
          this.customToast.showToast('error', 'Ocurrio un error inesperado');
        });

      this.isLoading = false;
    } else {
      Object.values(this.forgotForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  destroyModal(): void {
    this.#modal.destroy();
  }
}
