import { Router, RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  userSrv = inject(UserService);
  router = inject(Router)

  logout(){
    localStorage.removeItem("user");
    this.router.navigateByUrl('/login');
  }
}
