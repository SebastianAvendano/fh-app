import { CommonModule } from '@angular/common';
import { Component, inject, effect } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CreateUsersComponent } from '../create-users/create-users.component';
import { UserModel } from '@models/user-model';
import { UsersService } from '@services/users/users.service';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-list-admins',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    NzTableModule,
  ],
  templateUrl: './list-admins.component.html',
})
export default class ListAdminsComponent {
  users: UserModel[] = [];
  loading: boolean = false;

  listOfColumns: any[] = [
    {
      key: 'name',
      name: 'Nombres',
      sortOrder: null,
      sortFn: (a: UserModel, b: UserModel) => {
        return a.name?.localeCompare(b.name!);
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      key: 'lastName',
      name: 'Apellidos',
      sortOrder: null,
      sortFn: (a: UserModel, b: UserModel) => {
        return a.lastName?.localeCompare(b.lastName!);
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      key: 'id',
      name: 'Identificación',
      sortOrder: null,
      sortFn: (a: UserModel, b: UserModel) => {
        return a.documentId?.localeCompare(b.documentId!);
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      key: 'email',
      name: 'Correo',
      sortOrder: null,
      sortFn: (a: UserModel, b: UserModel) => {
        return a.email?.localeCompare(b.email!);
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Acciones',
    },
  ];

  searchName: string = '';
  searchId: string = '';
  searchEmail: string = '';
  modalService = inject(NzModalService);
  userService = inject(UsersService);

  constructor() {
    effect(() => {
      this.userService.getUsersByRol('admin');
      this.users = this.userService
        .users()
        .filter(
          (user) =>
            user.name?.toLowerCase().includes(this.searchName.toLowerCase()) &&
            user.email
              ?.toLowerCase()
              .includes(this.searchEmail.toLowerCase()) &&
            user.documentId?.toLowerCase().includes(this.searchId.toLowerCase())
        );
      this.loading = this.userService.loading();
    });
  }
  createUser(): void {
    this.showModal('Crear nuevo usuario');
  }

  updateUser(user: any): void {
    this.showModal('Actualizar información', true, true, user);
  }

  private showModal(
    title: string,
    isEditing?: boolean,
    loading?: boolean,
    user?: any
  ): void {
    this.modalService.create({
      nzTitle: title,
      nzWidth: '60%',
      nzCentered: true,
      nzData: {
        isEditing: isEditing,
        loading: loading,
        user: user,
      },
      nzContent: CreateUsersComponent,
    });
  }
}
