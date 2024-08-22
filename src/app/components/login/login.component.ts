import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpService } from '../../http.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  builder = inject(FormBuilder);
  httpService = inject(HttpService);
  toaster = inject(ToastrService);
  router = inject(Router);

  showPassword = false;

  loginForm = this.builder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onLogin() {
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;

    this.httpService
      .login(email, password)
      .pipe(
        catchError((error) => {
          this.toaster.error(
            'Inloggningen misslyckades. Kontrollera dina uppgifter och försök igen.'
          );
          return of(null);
        })
      )
      .subscribe((result) => {
        if (result && result.token) {
          console.log(result);
          localStorage.setItem('token', result.token);
          this.router.navigateByUrl('/books');
          this.toaster.success('Logga in framgångsrikt!');
        }
      });
  }

  toggleShowPassword(event: Event) {
    event.preventDefault();
    this.showPassword = !this.showPassword;
  }
}
