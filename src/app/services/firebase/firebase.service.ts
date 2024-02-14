import { Injectable, inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  
  private db = inject(AngularFirestore);

  async create<T>(collection: string, data: T): Promise<void> {
    const docRef = this.db.collection(collection).doc();
    return docRef.set({
      ...data,
      createdAt: new Date(),
      deleted: false,
      id: docRef.ref.id,
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

  put(collection: string, id: string, data: any) {
    const itemObservable = this.db.collection(collection).doc(id);
    return itemObservable.update({ ...data, updatedAt: new Date() });
  }

  softDelete(collection: string, id: string) {
    const itemObservable = this.db.collection(collection).doc(id);
    return itemObservable.update({ deleted: true, deletedAt: new Date() });
  }
}
