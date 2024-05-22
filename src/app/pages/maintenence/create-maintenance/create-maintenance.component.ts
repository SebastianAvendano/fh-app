import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EquipmentModel } from '@models/models/equipment-model';
import { MaintenanceModel } from '@models/models/maintenance-model';
import { UserModel } from '@models/models/user-model';
import { MaintenanceService } from '@services/maintenance/maintenance.service';
import { handleErrorForm } from '@shared/utils/handle_error_form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { UsersService } from '@services/users/users.service';
import { EquipmentService } from '@services/equipment/equipment.service';
import { ToastService } from '@services/customToast/toast.service';
import { FirebaseError } from '@angular/fire/app';
import { FileUpload } from '@models/models/file_upload';
import { maxSizeFile } from '@constants';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StorageService } from '@services/storage/storage.service';

@Component({
  selector: 'app-create-maintenance',
  templateUrl: './create-maintenance.component.html',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    NzSpinModule,
    NzModalModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzDatePickerModule,
    NzIconModule,
  ],
})
export class CreateMaintenanceComponent implements OnInit {
  maintenanceForm!: FormGroup;
  isEditing?: boolean;
  loadingButton?: boolean;
  maintenance?: MaintenanceModel;

  maintenanceService = inject(MaintenanceService);
  modal = inject(NzModalRef);
  fb = inject(FormBuilder);
  userService = inject(UsersService);
  equipmentService = inject(EquipmentService);
  customToast = inject(ToastService);
  storage = inject(StorageService);

  clients: UserModel[] = [];
  equipments: EquipmentModel[] = [];
  files: Map<string, FileUpload> = new Map<string, FileUpload>();

  constructor() {
    this.maintenanceForm = this.fb.group({
      client: [null, [Validators.required]],
      equipment: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      support: [null],
    });
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsersByRol('client').onSnapshot((query) => {
      this.clients = query.docs.map((snap) => {
        return UserModel.fromJson(snap.data());
      });
    });
  }

  getEquipments(userId: string) {
    this.equipmentService.getEquipments().onSnapshot((query) => {
      const data = query.docs.map((snap) => {
        return EquipmentModel.fromJson(snap.data());
      });
      const user = this.clients.find((value) => value.id == userId)!;
      this.equipments = data.filter((equipment) =>
        user.equipments?.includes(equipment.id!)
      );
    });
  }

  validateAction(): void {
    this.loadingButton = true;
    if (this.maintenanceForm.valid) {
      if (this.isEditing) {
        this.updateMaintenance();
      } else {
        this.createMaintenance();
      }
    } else {
      handleErrorForm(this.maintenanceForm);
      this.loadingButton = false;
    }
  }

  private async updateMaintenance() {
    await this.equipmentService
      .updateEquipment(this.maintenanceForm.value, this.maintenance?.id!)
      .then(() => {
        this.customToast.showToast(
          'success',
          'Información actualizada con exito'
        );
        this.destroyModal();
      })
      .catch((error: FirebaseError) => {
        this.customToast.showToast('error', error.message);
      });
    this.loadingButton = false;
  }

  private async createMaintenance() {
    const files: Map<string, string> = new Map();

    await this.maintenanceService
      .createMaintenance(this.maintenanceForm.value)
      .then(async () => {
        this.customToast.showToast('success', 'Mantenimiento creado con exito');
        this.loadingButton = false;
        this.destroyModal();
      })
      .catch((error) => {
        this.customToast.showToast('error', error.message);
        this.loadingButton = false;
      });
  }

  showPreview(event: any, key: string | undefined) {
    const fileSize = event.target.files[0].size;
    if (fileSize < maxSizeFile) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          const file: FileUpload = new FileUpload(
            reader.result as string,
            event.target.files[0],
            event.target.files[0].type.split('/')[1]
          );
          this.files?.set(key!, file);
          console.log(this.files);
          this.maintenanceForm.value[key!] = reader.result;
        };
      }
    } else {
      this.customToast.showToast('error', `la imagen no puede superar las 3MB`);
    }
  }

  removeFile(key: string | undefined): void {
    if (key) {
      this.files.delete(key);
      this.maintenanceForm.get(key)?.reset();
    }
  }

  openView(url?: string) {
    window.open(url);
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}
