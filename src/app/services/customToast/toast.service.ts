import { Injectable, inject } from '@angular/core';
import { NzMessageRef, NzMessageService } from 'ng-zorro-antd/message';

type NotificationType = 'success' | 'info' | 'warning' | 'error' | 'custom';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  #notification = inject(NzMessageService);

  async showToast(
    type: NotificationType,
    message: string
  ): Promise<NzMessageRef> {
    return this.#notification.create(type, message);
  }
}
