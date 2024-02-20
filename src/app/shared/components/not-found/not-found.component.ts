import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@services/navigation/navigation.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [NzResultModule, NzButtonModule],
  templateUrl: './not-found.component.html',
})
export default class NotFoundComponent implements OnInit {
  constructor(private navigation: NavigationService) {}

  ngOnInit() {}

  goHome() {
    if (this.navigation.canGoBack()) {
      this.navigation.pop();
    } else {
      this.navigation.replace('/login');
    }
  }
}
