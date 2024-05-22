import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SaleModel } from '@models/models/sale-model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CreateSaleComponent } from '../create-sale/create-sale.component';
import { SalesService } from '@services/sales/sales.service';

@Component({
  selector: 'app-list-sales',
  templateUrl: './list-sales.component.html',
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
export default class ListSalesComponent implements OnInit {

  sales: SaleModel[] = [];
  loading: boolean = true;

  listOfColumns: any[] = [
    {
      key: 'amount',
      name: 'Valor',
      sortOrder: null,
      sortFn: (a: SaleModel, b: SaleModel) => {
        return a.amount?.toString().localeCompare(b.amount!.toString());
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      key: 'model',
      name: 'Modelo',
      sortOrder: null,
      sortFn: (a: SaleModel, b: SaleModel) => {
        return a.createdAt?.toDateString().localeCompare(b.createdAt!.toDateString());
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Acciones',
    },
  ]

  modalService = inject(NzModalService);
  saleService = inject(SalesService);
  ngZone = inject(NgZone);
  cdr= inject(ChangeDetectorRef);
  
  constructor() { }

  ngOnInit(): void {
    this.getSales();
  }

  async getSales() {
    this.saleService.getSales().onSnapshot((query) => {
      this.sales = query.docs.map((snap) => {return SaleModel.fromJson(snap.data())})
      this.ngZone.run(() => {
        this.cdr.detectChanges();
      })
      });
  this.loading = false
  }

  createSale(): void {
    this.showModal('Crear nueva venta');
  }

  detail(sale: SaleModel): void {
    this.showModal('Información', true, sale);
  }

  private showModal(
    title: string,
    isEditing?: boolean,
    sale?: SaleModel
  ): void {
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: '60%',
      nzCentered: true,
      nzContent: CreateSaleComponent,
    });
    const instance = modal.getContentComponent();
    instance.isEditing = isEditing;
    instance.sale = sale;
  }

}
