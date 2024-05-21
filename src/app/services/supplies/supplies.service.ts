import { Injectable, inject } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { FirebaseService } from '@services/firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {
  private suppliesCollection = 'supplies';

  private auth = inject(AuthService);
  private firebase = inject(FirebaseService);

  constructor() {}

  getSupplies() {
    return this.firebase.getList(this.suppliesCollection);
  }

  createSupplies(data: any) {

    const user = this.auth.user;
    return this.firebase.create( this.suppliesCollection, {
      ...data,
      deleted: false,
      createdBy: user()?.id,
    });
  }

  async updateSupplies(data: any, id: string) {
    return this.firebase.put(this.suppliesCollection, id, data);
  }
}
