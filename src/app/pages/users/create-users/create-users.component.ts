import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { documentTypes, roles } from '@constants';
import { handleErrorForm } from '@shared/utils/handle_error_form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UserModel } from '@models/user-model';
import { UsersService } from '@services/users/users.service';
import { ToastService } from '@services/customToast/toast.service';

@Component({
  selector: 'app-create-users',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    NzSpinModule,
    NzModalModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
  ],
  templateUrl: './create-users.component.html',
})
export class CreateUsersComponent {
  userForm!: FormGroup;
  isEditing?: boolean;
  user?: UserModel;
  loading?: boolean;
  loadingButton?: boolean;

  documentTypes = documentTypes;
  roles = roles;
  private modal = inject(NzModalRef);
  private fb = inject(FormBuilder);
  private userService = inject(UsersService);
  private customToast = inject(ToastService);

  constructor() {
    this.userForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      documentType: [null, [Validators.required]],
      documentId: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      rol: [null, [Validators.required]],
      address: [null, [Validators.required]],
    });
  }

  validateAction(): void {
    this.loadingButton = true;
    if (this.userForm.valid) {
      if (this.isEditing) {
        // this.updateUser(this.user!);
      } else {
        this.createUser();
      }
    } else {
      handleErrorForm(this.userForm);
      this.loadingButton = false;
    }
  }

  private createUser() {
    const user = UserModel.fromJson(this.userForm.value);

    this.userService.createAccount(user).then((credential) => {
      const uid = credential.user?.uid;

      if (uid) {
        this.userService.createUser(user.copyWith({ id: uid }));
        this.customToast.showToast('success', 'Usuario creado con exito');
      } else {
        credential.user?.delete();
        this.customToast.showToast('error', 'Ocurrio un error inesperado');
      }
    });
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}
