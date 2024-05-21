import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SuppliesModel } from '@models/models/supplies-model';
import { SuppliesService } from '@services/supplies/supplies.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CreateSuppliesComponent } from '../create-supplies/create-supplies.component';

@Component({
  selector: 'app-list-supplies',
  templateUrl: './list-supplies.component.html',
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
export default class ListSuppliesComponent implements OnInit {
  supplies: SuppliesModel[] = [];
  loading: boolean = true;

  listOfColumns: any[] = [
    {
      key: 'serial',
      name: 'Serial',
      sortOrder: null,
      sortFn: (a: SuppliesModel, b: SuppliesModel) => {
        return a.serial?.localeCompare(b.serial!);
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      key: 'model',
      name: 'Modelo',
      sortOrder: null,
      sortFn: (a: SuppliesModel, b: SuppliesModel) => {
        return a.model?.localeCompare(b.model!);
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      key: 'brand',
      name: 'Marca',
      sortOrder: null,
      sortFn: (a: SuppliesModel, b: SuppliesModel) => {
        return a.brand?.localeCompare(b.brand!);
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      key: 'stock',
      name: 'Stock',
      sortOrder: null,
      sortFn: (a: SuppliesModel, b: SuppliesModel) => {
        return a.availableStock!.toString().localeCompare(b.availableStock!.toString());
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Acciones',
    },
  ];

  modalService = inject(NzModalService);
  suppliesService = inject(SuppliesService);
  ngZone = inject(NgZone);
  cdr= inject(ChangeDetectorRef);
  
  constructor() {}

  ngOnInit(): void {
    this.getSupplies();
  }

  async getSupplies() {
    this.suppliesService.getSupplies().onSnapshot((query) => {
      this.supplies = query.docs.map((snap) => {return SuppliesModel.fromJson(snap.data())})
  })
  this.ngZone.run(() => {
    this.cdr.detectChanges();
  });
  this.loading = false
  }

  createSupplies(): void {
    this.showModal('Crear nuevo producto');
  }

  updateSupplies(supplies: SuppliesModel): void {
    this.showModal('Actualizar información', true, supplies);
  }

  private showModal(
    title: string,
    isEditing?: boolean,
    supplies?: SuppliesModel
  ): void {
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: '60%',
      nzCentered: true,
      nzContent: CreateSuppliesComponent,
    });
    const instance = modal.getContentComponent();
    instance.isEditing = isEditing;
    instance.supplies = supplies;
  }
}
