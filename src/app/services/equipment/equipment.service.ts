import { Injectable, inject } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { FirebaseService } from '@services/firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private equipmentsCollection = 'equipments';

  private auth = inject(AuthService);
  private firebase = inject(FirebaseService);

  constructor() {}

  getEquipments() {
    return this.firebase.getList(this.equipmentsCollection);
  }

  createEquipment(data: any) {

    const user = this.auth.user;
    return this.firebase.create( this.equipmentsCollection, {
      ...data,
      deleted: false,
      createdBy: user()?.id,
    });
  }

  async updateEquipment(data: any, id: string) {
    return this.firebase.put(this.equipmentsCollection, id, data);
  }
}
