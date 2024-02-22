import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { BASE_PATH } from '@constants';
import { UserModel } from '@models/user-model';
import { AuthService } from '@services/auth/auth.service';
import { FirebaseService } from '@services/firebase/firebase.service';

interface state {
  loading: boolean;
  users: UserModel[];
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersCollection = 'users';

  private auth = inject(AuthService);
  private firebase = inject(FirebaseService);
  private http = inject(HttpClient);

  #state = signal<state>({
    loading: true,
    users: [],
  });

  public users = computed(() => this.#state().users);
  public loading = computed(() => this.#state().loading);

  constructor() {}

  getUsersByRol(rol: string) {
    this.firebase
      .getList(this.usersCollection)
      .where('rol', '==', rol)
      .onSnapshot((querySnapshot) => {
        const users = querySnapshot.docs.map((snapshot) => {
          return UserModel.fromJson(snapshot.data());
        });
        this.#state.set({ users: users, loading: false });
      });
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
