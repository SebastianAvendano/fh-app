import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CreateEquipmentComponent } from '../create-equipment/create-equipment.component';
import { EquipmentService } from '@services/equipment/equipment.service';
import { EquipmentModel } from '@models/models/equipment-model';

@Component({
  selector: 'app-list-equipments',
  templateUrl: './list-equipments.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    NzTableModule,
  ],
})
export default class ListEquipmentsComponent implements OnInit {

  equipments: EquipmentModel[] = [];
  loading: boolean = true;

  listOfColumns: any[] = [
    {
      key: 'serial',
      name: 'Serial',
      sortOrder: null,
      sortFn: (a: EquipmentModel, b: EquipmentModel) => {
        return a.serial?.localeCompare(b.serial!);
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      key: 'model',
      name: 'Modelo',
      sortOrder: null,
      sortFn: (a: EquipmentModel, b: EquipmentModel) => {
        return a.model?.localeCompare(b.model!);
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      key: 'brand',
      name: 'Marca',
      sortOrder: null,
      sortFn: (a: EquipmentModel, b: EquipmentModel) => {
        return a.brand?.localeCompare(b.brand!);
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Acciones',
    },
  ];

  modalService = inject(NzModalService);
  equipmentService = inject(EquipmentService);
  ngZone = inject(NgZone);
  cdr= inject(ChangeDetectorRef);
  
  constructor() {}

  ngOnInit(): void {
    this.getEquipments();
  }

  async getEquipments() {
    this.equipmentService.getEquipments().onSnapshot((query) => {
      this.equipments = query.docs.map((snap) => {return EquipmentModel.fromJson(snap.data())})
  })
  this.ngZone.run(() => {
    this.cdr.detectChanges();
    this.loading = false
  });
  }

  createEquipment(): void {
    this.showModal('Crear nuevo equipo');
  }

  updateEquipment(user: EquipmentModel): void {
    this.showModal('Actualizar información', true, user);
  }

  private showModal(
    title: string,
    isEditing?: boolean,
    equipment?: EquipmentModel
  ): void {
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: '60%',
      nzCentered: true,
      nzContent: CreateEquipmentComponent,
    });
    const instance = modal.getContentComponent();
    instance.isEditing = isEditing;
    instance.equipment = equipment;
  }
}
