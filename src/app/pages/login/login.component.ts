import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { AuthService, NavigationService, ToastService } from '@services';
import { ForgotPasswordComponent } from '@shared/components';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent {
  isCollapsed = false;
  isLoading = false;
  loginForm!: FormGroup;
  hidePassword = signal(true);
  modalService = inject(NzModalService);
  #auth = inject(AuthService);

  private customToast = inject(ToastService);
  private fb = inject(FormBuilder);
  private router = inject(NavigationService);

  constructor() {
    this.loginForm = this.fb.group({
      remember: [true],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  async login() {
    this.isLoading = true;

    await this.#auth
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .then(() => {
        this.router.push('/welcome');
      })
      .catch(() => {
        this.customToast.showToast('error', 'Credenciales inválidas');
      });

    this.isLoading = false;
  }

  togglePasswordVisibility() {
    this.hidePassword.update((value) => !value);
  }

  showModal() {
    this.modalService.create({
      nzTitle: 'Formulario de recuperación de contraseña',
      nzWidth: '40%',
      nzCentered: true,
      nzContent: ForgotPasswordComponent,
    });
  }
}
