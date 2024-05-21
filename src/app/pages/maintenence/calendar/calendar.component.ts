import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  standalone: true,
  imports: [NzButtonModule,
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
  appointments: string[] = [];
  
  modalService = inject(NzModalService);

  technicalVisits: any[] = [];

  listDataMap = {
    eight: [
      { type: 'warning', content: 'Maria Camila dussan' },
    ],
    ten: [
      { type: 'warning', content: 'Carolina Manchola' },
      { type: 'success', content: 'Andres Rico.' },
    ],
  };

    
  constructor() {}

  ngOnInit(): void {}

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }


  onDayDoubleClick(date: any): void {
    this.technicalVisits = this.getTechnicalVisitsForDate(date);
    this.isModalVisible = true;
  }

  onSelectChange(date: Date): void {
    this.selectedDate = date;
  }

  handleScheduleAppointment(): void {
    // Lógica para abrir un formulario de agendamiento de cita
    console.log('Agendar cita');
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  handleOk(): void {
    this.isModalVisible = false;
  }

  getTechnicalVisitsForDate(date: Date): any[] {
    // Simulamos que cargamos las visitas técnicas desde un JSON local
    this.technicalVisits = [
      { client: 'Cliente A', address: 'Dirección A', startTime: new Date('2024-05-20T10:00:00'), endTime: new Date('2024-05-20T12:00:00') },
      { client: 'Cliente B', address: 'Dirección B', startTime: new Date('2024-05-20T14:00:00'), endTime: new Date('2024-05-20T16:00:00') }
      // Puedes agregar más visitas técnicas aquí
    ];

    // Filtramos las visitas para la fecha seleccionada
    return this.technicalVisits.filter(visit => this.isSameDay(visit.startTime, date));
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  }
}
