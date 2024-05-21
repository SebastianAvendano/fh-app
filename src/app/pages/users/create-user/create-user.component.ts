import { Component, OnInit, inject } from '@angular/core';
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
import { UsersService } from '@services/users/users.service';
import { ToastService } from '@services/customToast/toast.service';
import { catchError, finalize, of, tap } from 'rxjs';
import { TFiltersTable } from '../../../data/types/filters';
import { FirebaseError } from '@angular/fire/app';
import { UserModel } from '@models/models/user-model';

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
  templateUrl: './create-user.component.html',
})
export class CreateUsersComponent implements OnInit {
  userForm!: FormGroup;
  isEditing?: boolean;
  user?: UserModel;
  loadingButton?: boolean;
  roles?: TFiltersTable[] = roles;
  documentTypes = documentTypes;
  userType?: string;

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

  ngOnInit(): void {
    if (this.isEditing) {
      this.userForm.patchValue(this.user!);
      this.userForm.get('email')?.disable();
    }
      if (this.userType == "client") {
        this.roles = roles.filter((value) => value.value == "client")
      }
  }

  validateAction(): void {
    this.loadingButton = true;
    if (this.userForm.valid) {
      if (this.isEditing) {
        this.updateUser();
      } else {
        this.createUser();
      }
    } else {
      handleErrorForm(this.userForm);
      this.loadingButton = false;
    }
  }

  private async createUser() {
    this.userService
      .createUser(this.userForm.value)
      .pipe(
        catchError((error) => {
          this.customToast.showToast('error', error.error);
          return of(null);
        }),
        tap(async (res: any) => {
          if (res != null) {
            await this.customToast.showToast('success', res.message);
            this.destroyModal();
          }
        }),
        finalize(() => {
          this.loadingButton = false;
        })
      )
      .subscribe();
  }

  private async updateUser() {
    await this.userService
      .updateUser(this.userForm.value, this.user?.id!)
      .then(() => {
        this.customToast.showToast(
          'success',
          'Información actualizada con exito'
        );
        this.destroyModal();
      })
      .catch((error: FirebaseError) => {
        this.customToast.showToast('error', error.message);
      });
    this.loadingButton = false;
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}
