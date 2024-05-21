import { HttpClient } from '@angular/common/http';
import { Injectable, inject, } from '@angular/core';
import { BASE_PATH } from '@constants';
import { AuthService } from '@services/auth/auth.service';
import { FirebaseService } from '@services/firebase/firebase.service';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersCollection = 'users';

  private auth = inject(AuthService);
  private firebase = inject(FirebaseService);
  private http = inject(HttpClient);

  constructor() {}

  getUsersByRol(rol: string) {
    return this.firebase.getList(this.usersCollection).where('rol', '==', rol);
  }

  createUser(data: any) {
    const user = this.auth.user;
    return this.http.post(`${BASE_PATH}/users`, {
      ...data,
      deleted: false,
      createdBy: user()?.id,
    });
  }

  async updateUser(data: any, id: string) {
    return this.firebase.put(this.usersCollection, id, data);
  }
}
