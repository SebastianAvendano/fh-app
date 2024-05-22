import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CreateMaintenanceComponent } from '../create-maintenance/create-maintenance.component';
import { MaintenanceModel } from '@models/models/maintenance-model';
import { MaintenanceService } from '@services/maintenance/maintenance.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  standalone: true,
  imports: [
    NzButtonModule,
    NzCalendarModule,
    CommonModule,
    FormsModule,
    NzModalModule,
    NzBadgeModule,
  ],
})
export default class CalendarComponent implements OnInit {
  selectedDate: any;
  isModalVisible = false;
  modalService = inject(NzModalService);
  maintenanceService = inject(MaintenanceService);

  maintenances: MaintenanceModel[] = [];
  
  @ViewChild('dateCell', { static: true }) dateCell!: TemplateRef<Date>;

  constructor() {}

  ngOnInit(): void {
    this.getMaintenances()
  }

  getMaintenances() {
    this.maintenanceService.getMaintenances().onSnapshot((query) => {
      this.maintenances = query.docs.map((snap) => {
        return MaintenanceModel.fromJson(snap.data());
      });
    });
  }

  createMaintenance() {
    this.showModal('Agendar cita');
  }

  updateMaintenance() {
    this.showModal('Agendar cita');
  }

  private showModal(
    title: string,
    isEditing?: boolean,
    maintenance?: MaintenanceModel
  ): void {
    const modal = this.modalService.create({
      nzTitle: title,
      nzWidth: '60%',
      nzCentered: true,
      nzContent: CreateMaintenanceComponent,
    });
    const instance = modal.getContentComponent();
    instance.isEditing = isEditing;
    instance.maintenance = maintenance;
  }

  dateCellRender = (date: Date): string => {
    const maintenancesOnDate = this.maintenances.filter(
      (maintenance) =>
        maintenance.date!.toDateString() === date.toDateString()
    );

    return maintenancesOnDate
      .map(
        (maintenance) => `
        <div>
          <nz-badge
            [nzStatus]="'processing'"
            [nzText]="'${maintenance.clientId} (${maintenance.amount})'"
          ></nz-badge>
        </div>
      `
      )
      .join('');
  };
}
