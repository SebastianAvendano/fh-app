import { Injectable, inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';
import {
  Firestore,
  collection,
  collectionData,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore = inject(Firestore);

  private db = inject(AngularFirestore);
  private auth = inject(AuthService);

  async create<T>(collection: string, data: T): Promise<void> {
    const docRef = this.db.collection(collection).doc();
    const user = this.auth.user;

    return docRef.set({
      ...data,
      createdAt: new Date(),
      deleted: false,
      id: docRef.ref.id,
      createdBy: user()?.id,
    });
  }

  async createWhitCustomId<T>(
    collection: string,
    data: T,
    id: string
  ): Promise<void> {
    const user = this.auth.user;
    const item = this.db.collection(collection).doc(id);
    return item.set({
      ...data,
      createdAt: new Date(),
      deleted: false,
      createdBy: user()?.id,
    });
  }

  delete(collection: string, id: string) {
    const itemObservable = this.db.collection(collection).doc(id);
    return itemObservable.delete();
  }

  get(collection: string, id: string): AngularFirestoreDocument<any> {
    return this.db.collection(collection).doc(id);
  }

  getList<T>(collection: string) {
    return this.db
      .collection<T>(collection)
      .ref.orderBy('createdAt', 'desc')
      .where('deleted', '==', false);
  }

  getDocs<T>(collectionName: string) {
    const ref = collection(this.firestore, collectionName);
    const wa = [orderBy('createdAt', 'desc'), where("deleted", "==", false)]

    const refq = query(ref, ...wa);

     return collectionData(refq) 
  }

  put(collection: string, id: string, data: any) {
    const user = this.auth.user;
    const itemObservable = this.db.collection(collection).doc(id);

    return itemObservable.update({
      ...data,
      updatedAt: new Date(),
      updatedBy: user()?.id,
    });
  }

  softDelete(collection: string, id: string) {
    const itemObservable = this.db.collection(collection).doc(id);
    const user = this.auth.user;

    return itemObservable.update({
      deleted: true,
      deletedAt: new Date(),
      deletedBy: user()?.id,
    });
  }
}
