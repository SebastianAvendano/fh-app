import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CreateUsersComponent } from '../create-users/create-users.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [NzButtonModule, NzModalModule],
  templateUrl: './list-users.component.html',
})
export default class ListUsersComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
