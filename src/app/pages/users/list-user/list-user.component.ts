import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  effect,
  OnInit,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CreateUsersComponent } from '../create-user/create-user.component';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '@services/users/users.service';
import { validateRol } from '@shared/utils/validate_rol';
import { UserModel } from '@models/models/user-model';

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
  templateUrl: './list-user.component.html',
})
export default class ListUsersComponent implements OnInit {
  users: UserModel[] = [];
  loading: boolean = true;

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

  userType?: string | null;
  modalService = inject(NzModalService);
  userService = inject(UsersService);
  route = inject(ActivatedRoute);
  ngZone = inject(NgZone);
  cdr = inject(ChangeDetectorRef);

  rol?: string;

  constructor() {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.rol = params.get('userType')!;
      this.userType = validateRol(this.rol!);
      this.getUsers(this.rol!);
    });
  }

  async getUsers(rol: string) {
    this.userService.getUsersByRol(rol).onSnapshot((query) => {
      this.users = query.docs.map((snapshot) => {
        return UserModel.fromJson(snapshot.data());
      });
      this.loading = false;
      this.ngZone.run(() => {
        this.cdr.detectChanges();
      });
    });
  }

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
    instance.userType = this.rol;
  }
}
