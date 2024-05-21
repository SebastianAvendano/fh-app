import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuppliesModel } from '@models/models/supplies-model';
import { ToastService } from '@services/customToast/toast.service';
import { SuppliesService } from '@services/supplies/supplies.service';
import { handleErrorForm } from '@shared/utils/handle_error_form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-create-supplies',
  templateUrl: './create-supplies.component.html',
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
export class CreateSuppliesComponent implements OnInit {
  suppliesForm!: FormGroup;
  isEditing?: boolean;
  supplies?: SuppliesModel;
  loadingButton?: boolean;

  modal = inject(NzModalRef);
  suppliesService = inject(SuppliesService);
  fb = inject(FormBuilder);
  customToast = inject(ToastService);

  constructor() {
    this.suppliesForm = this.fb.group({
      serial: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      model: [null, [Validators.required]],
      saleValue: [null, [Validators.required]],
      availableStock: [null, [Validators.required]],
      securityStock: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.isEditing) {
      this.suppliesForm.patchValue(this.supplies!);
    }
  }

  validateAction(): void {
    this.loadingButton = true;
    if (this.suppliesForm.valid) {
      if (this.isEditing) {
        this.updateEquipment();
      } else {
        this.createEquipment();
      }
    } else {
      handleErrorForm(this.suppliesForm);
      this.loadingButton = false;
    }
  }

  private async createEquipment() {
    await this.suppliesService
      .createSupplies(this.suppliesForm.value)
      .then(() => {
        this.customToast.showToast('success', 'Producto creado con exito');
        this.loadingButton = false;
        this.destroyModal();
      })
      .catch((error) => {
        this.customToast.showToast('error', error.message);
        this.loadingButton = false;
      });
  }

  private async updateEquipment() {
    await this.suppliesService
      .updateSupplies(this.suppliesForm.value, this.supplies?.id!)
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
