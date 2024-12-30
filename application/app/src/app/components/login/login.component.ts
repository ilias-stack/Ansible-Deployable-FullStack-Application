import { Component, inject } from '@angular/core';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, FormsModule, CommonModule, ButtonComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private auth = inject(AuthService);
  constructor() { }
  showPassword = false;
  buttonsDisabled = false;
  user = {
    email: "user@student.com",
    password: "1234",
  };
  errorMessage = "";
  async handleSubmit() {
    this.buttonsDisabled = true;
    if (this.auth.login(this.user.email, this.user.password)) {
      this.router.navigate(["/chatbot"]);
    } else {
      this.toastr.error("Invalid username or password!");
      this.buttonsDisabled = false;
      this.user.password = "";

    }
  }
}
