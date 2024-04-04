import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserModel } from '@models/user-model';
import { UsersService } from '@services/users/users.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-list-clients',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    NzTableModule,
  ],
  templateUrl: './list-clients.component.html',
})
export default class ListClientsComponent implements OnInit {
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
  userService = inject(UsersService);

  constructor() {}

  ngOnInit() {}

  createUser() {}

  updateUser(user: UserModel) {}
}
