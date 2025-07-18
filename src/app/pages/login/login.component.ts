import { Component, inject, NgModule } from '@angular/core';
import { IUserModel, User } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj:User = new User();
  router = inject(Router);
  userSrv = inject(UserService);


  onLogin(){
    this.userSrv.loginUser(this.loginObj).subscribe({
      next:(res:IUserModel)=>{
        alert("User logged");
        localStorage.setItem("user",JSON.stringify(res));
        this.userSrv.loggedUserData = res;
        this.router.navigateByUrl("/dashboard");
      },
      error:(error)=>{
        alert("User login failed");
      }
    })
  }

}
