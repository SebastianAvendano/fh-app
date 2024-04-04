import { CommonModule } from '@angular/common';
import { Component, inject, effect, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CreateUsersComponent } from '../form_admin/create-admin.component';
import { UserModel } from '@models/user-model';
import { UsersService } from '@services/users/users.service';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TFiltersTable } from '@models/types/filters';
import { roles } from '@constants';

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
export default class ListAdminsComponent implements OnInit {
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
  rolesAdmin = roles;

  constructor() {
    this.userService.getAdmins();
    effect(() => {
      this.users = this.userService.users();
      this.loading = this.userService.loading();
    });
  }

  ngOnInit(): void {}

  filterList() {}

  createUser(): void {
    this.showModal('Crear nuevo usuario');
  }

  updateUser(user: UserModel): void {
    this.showModal('Actualizar información', true, user);
  }

  private showModal(
    title: string,
    isEditing?: boolean,
    user?: UserModel
  ): void {
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: '60%',
      nzCentered: true,
      nzData: {
        isEditing: isEditing,
        user: user,
      },
      nzContent: CreateUsersComponent,
    });
    const instance = modal.getContentComponent();
    instance.isEditing = isEditing;
    instance.user = user;
  }
  
}
