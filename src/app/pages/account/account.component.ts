import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserModel } from '@models/user-model';
import { AuthService } from '@services/auth/auth.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { documentTypes, roles } from '@constants';
import { UsersService } from '@services/users/users.service';
import { ToastService } from '@services/customToast/toast.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzSpinModule,
    NzGridModule,
    NzIconModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule,
  ],
  templateUrl: './account.component.html',
  styleUrls: ['./account.module.scss'],
})
export default class AccountComponent {
  user: UserModel | null = null;
  loading = false;
  userForm!: FormGroup;
  documentTypes = documentTypes;
  roles = roles;

  private accountService = inject(AuthService);
  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);
  private customToast = inject(ToastService);

  constructor() {
    this.userForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      documentType: [null, [Validators.required]],
      documentId: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [
        { value: null, disabled: true },
        [Validators.required, Validators.email],
      ],
      rol: [{ value: null, disabled: true }, [Validators.required]],
      address: [null, [Validators.required]],
    });

    effect(() => {
      this.loading = this.accountService.loading();
      this.user = this.accountService.user();
      this.userForm.patchValue(this.user!);
    });
  }

  async updateData() {
    this.loading = true;
    try {
      await this.usersService.updateUser(this.userForm.value, this.user?.id!);
      this.customToast.showToast('success', 'Información actualizada');
    } catch (error) {
      console.error(error);
      this.customToast.showToast('error', 'Ocurrio un error inesperado');
    }
  }

  resetPassword() {
    this.accountService.resetPassword(this.user?.email!).then(() => {
      this.customToast.showToast(
        'success',
        'Se envio un correo con las instrucciones'
      );
    });
  }
}
