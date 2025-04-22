import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { iLoginRequest } from '@auth/interfaces';
import { AuthService } from '@auth/services/auth.service';
//
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'auth-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './auth-login-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLoginPageComponent {
  private _router: Router = inject(Router);
  private _authService: AuthService = inject(AuthService);
  private _formBuilder: FormBuilder = inject(FormBuilder);

  hasError = signal<boolean>(false);
  isPosting = signal<boolean>(false);

  loginForm: FormGroup = this._formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit(): void {
    try {
      if (this.loginForm.invalid) {
        toast.error('Inicio de Sesión Fallido', {
          duration: 2000,
          description: 'Por Favor, Completa Todos los Campos Requeridos',
          // delete: true,
        });
        return;
      }

      const data: iLoginRequest = {
        email: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value,
      };

      this.isPosting.set(true);

      this._authService.login(data).subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          toast.success('Inicio de Sesión Exitoso', {
            duration: 2000,
            description: 'Bienvenido de Nuevo',
          });
          this._router.navigateByUrl('/');
          return;
        }
        toast.error('Inicio de Sesión Fallido', {
          duration: 2000,
          description: 'Credenciales Incorrectas',
        });

        this.isPosting.set(false);
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default AuthLoginPageComponent;
