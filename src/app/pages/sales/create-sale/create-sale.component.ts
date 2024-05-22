import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EquipmentModel } from '@models/models/equipment-model';
import { SaleModel } from '@models/models/sale-model';
import { SuppliesModel } from '@models/models/supplies-model';
import { UserModel } from '@models/models/user-model';
import { ToastService } from '@services/customToast/toast.service';
import { EquipmentService } from '@services/equipment/equipment.service';
import { SalesService } from '@services/sales/sales.service';
import { SuppliesService } from '@services/supplies/supplies.service';
import { UsersService } from '@services/users/users.service';
import { handleErrorForm } from '@shared/utils/handle_error_form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-create-sale',
  templateUrl: './create-sale.component.html',
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
export class CreateSaleComponent implements OnInit {
  isEditing?: boolean;
  sale?: SaleModel;
  clients: UserModel[] = [];
  equipments: EquipmentModel[] = [];
  supplies: SuppliesModel[] = [];
  salesForm!: FormGroup;
  total: number = 0;
  loadingButton?: boolean;

  modal = inject(NzModalRef);
  fb = inject(FormBuilder);
  userService = inject(UsersService);
  equipmentService = inject(EquipmentService);
  customToast = inject(ToastService);
  suppliesService = inject(SuppliesService);
  salesService = inject(SalesService);

  constructor() {
    this.salesForm = this.fb.group({
      client: [null, [Validators.required]],
      equipments: [null, [Validators.required]],
      supplies: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.getEquipments();
    this.getUsers();
    this.getSupplies();

    if (this.isEditing){
      console.log(this.sale)
      this.salesForm.patchValue(this.sale!);
    }
  }

  getUsers() {
    this.userService.getUsersByRol('client').onSnapshot((query) => {
      this.clients = query.docs.map((snap) => {
        return UserModel.fromJson(snap.data());
      });
    });
  }

  getEquipments() {
    this.equipmentService.getEquipments().onSnapshot((query) => {
      this.equipments = query.docs.map((snap) => {
        return EquipmentModel.fromJson(snap.data());
      });
    });
  }

  async getSupplies() {
    this.suppliesService.getSupplies().onSnapshot((query) => {
      this.supplies = query.docs.map((snap) => {
        return SuppliesModel.fromJson(snap.data());
      });
    });
  }

  calculateTotal(): void {
    const selectedEquipments: EquipmentModel[] | null =
      this.salesForm.value.equipments;
    const selectedSupplies: SuppliesModel[] | null =
      this.salesForm.value.supplies;

    if (selectedEquipments || selectedSupplies) {
      for (const equipment of this.equipments) {
        if (selectedEquipments?.includes(equipment)) {
          this.total += equipment.saleValue!;
        }
      }

      for (const supply of this.supplies) {
        if (selectedSupplies?.includes(supply)) {
          this.total += supply.saleValue!;
        }
      }
    } else {
      this.total = 0;
    }
  }

  validateAction(): void {
    this.loadingButton = true;
    if (this.salesForm.valid) {
      if (this.isEditing) {
      } else {
        this.createSale();
      }
    } else {
      handleErrorForm(this.salesForm);
      this.loadingButton = false;
    }
  }

  createSale() {
    // Obtener solo los IDs de los equipos seleccionados
    const selectedEquipmentIds = this.salesForm.value.equipments.map(
      (equipment: EquipmentModel) => equipment.id
    );

    // Obtener solo los IDs de los suministros seleccionados
    const selectedSupplyIds = this.salesForm.value.supplies.map(
      (supply: SuppliesModel) => supply.id
    );

    // Enviar la solicitud de creación de la venta con los IDs y el total
    this.salesService
      .createSale({
        ...this.salesForm.value,
        equipments: selectedEquipmentIds,
        supplies: selectedSupplyIds,
        amount: this.total,
      })
      .then(async () => {
        this.customToast.showToast('success', 'Venta creado con exito');
        this.loadingButton = false;
        this.destroyModal();
      })
      .catch((error) => {
        this.customToast.showToast('error', error.message);
        this.loadingButton = false;
      });
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}
