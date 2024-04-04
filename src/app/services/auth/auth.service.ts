import { Injectable, computed, inject, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { FirebaseService } from '@services/firebase/firebase.service';
import { UserModel } from '@models/user-model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface state {
  user: UserModel | null;
  loading: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private afAuth = inject(AngularFireAuth);
  private db = inject(AngularFirestore);

  #state = signal<state>({ user: null, loading: true });

  public user = computed(() => this.#state().user);
  public loading = computed(() => this.#state().loading);

  constructor() {
    this.afAuth.user.subscribe((user) => {
      this.db
        .collection('admins')
        .doc(user?.uid)
        .valueChanges()
        .subscribe((snap) => {
          this.#state.set({
            user: UserModel.fromJson(snap),
            loading: false,
          });
        });
    });
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut();
  }

  createAuth(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  getCurrentUser(): Observable<firebase.User | null> {
    return this.afAuth.user;
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}
