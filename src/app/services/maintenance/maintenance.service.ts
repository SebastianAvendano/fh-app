import { Injectable, inject } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { FirebaseService } from '@services/firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  private maintenanceCollection = 'maintenances';

  private auth = inject(AuthService);
  private firebase = inject(FirebaseService);

  constructor() {}

  getMaintenances() {
    return this.firebase.getList(this.maintenanceCollection);
  }

  createMaintenance(data: any) {
    const user = this.auth.user;
    return this.firebase.create( this.maintenanceCollection, {
      ...data,
      deleted: false,
      createdBy: user()?.id,
    });
  }

  async updateMaintenance(data: any, id: string) {
    return this.firebase.put(this.maintenanceCollection, id, data);
  }
}
