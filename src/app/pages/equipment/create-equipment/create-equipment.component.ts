import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { brands } from '@constants';
import { EquipmentModel } from '@models/models/equipment-model';
import { ToastService } from '@services/customToast/toast.service';
import { EquipmentService } from '@services/equipment/equipment.service';
import { handleErrorForm } from '@shared/utils/handle_error_form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-create-equipment',
  templateUrl: './create-equipment.component.html',
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
  ],
})
export class CreateEquipmentComponent implements OnInit {
  equipmentForm!: FormGroup;
  isEditing?: boolean;
  equipment?: EquipmentModel;
  loadingButton?: boolean;
  brands = brands;
  modal = inject(NzModalRef);
  equipmentService = inject(EquipmentService);
  fb = inject(FormBuilder);
  customToast = inject(ToastService);

  constructor() {
    this.equipmentForm = this.fb.group({
      serial: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      model: [null, [Validators.required]],
      rentalValue: [null, [Validators.required]],
      saleValue: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.isEditing) {
      this.equipmentForm.patchValue(this.equipment!);
    }
  }

  validateAction(): void {
    this.loadingButton = true;
    if (this.equipmentForm.valid) {
      if (this.isEditing) {
        this.updateEquipment();
      } else {
        this.createEquipment();
      }
    } else {
      handleErrorForm(this.equipmentForm);
      this.loadingButton = false;
    }
  }

  private async createEquipment() {
    await this.equipmentService
      .createEquipment(this.equipmentForm.value)
      .then(() => {
        this.customToast.showToast('success', 'Equipo creado con exito');
        this.loadingButton = false;
        this.destroyModal();
      })
      .catch((error) => {
        this.customToast.showToast('error', error.message);
        this.loadingButton = false;
      });
  }

  private async updateEquipment() {
    await this.equipmentService
      .updateEquipment(this.equipmentForm.value, this.equipment?.id!)
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

  destroyModal(): void {
    this.modal.destroy();
  }
}
