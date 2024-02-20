import { Injectable, computed, inject, signal } from '@angular/core';
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

  async createUser(data: UserModel) {
    return this.firebase.createWhitCustomId(
      this.usersCollection,
      data.toJson(),
      data.id!
    );
  }

  async createAccount(user: UserModel) {
    return this.auth.createAuth(user.email!, user.documentId!);
  }

  async updateUser(data: any, id: string) {
    return this.firebase.put(this.usersCollection, id, data);
  }
}
