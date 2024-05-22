import { Injectable, inject } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { FirebaseService } from '@services/firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private salesCollection = 'sales';

  private auth = inject(AuthService);
  private firebase = inject(FirebaseService);

  constructor() {}

  getSales() {
    return this.firebase.getList(this.salesCollection);
  }

  createSale(data: any) {
    const user = this.auth.user;
    return this.firebase.create( this.salesCollection, {
      ...data,
      deleted: false,
      createdBy: user()?.id,
    });
  }

}
