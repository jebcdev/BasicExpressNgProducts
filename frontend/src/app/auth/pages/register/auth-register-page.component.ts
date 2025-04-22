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
import { iRegisterRequest } from '@auth/interfaces';
import { AuthService } from '@auth/services/auth.service';
import { toast } from 'ngx-sonner';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'auth-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './auth-register-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthRegisterPageComponent {
  private _router: Router = inject(Router);
  private _authService: AuthService = inject(AuthService);
  private _formBuilder: FormBuilder = inject(FormBuilder);

  hasError = signal<boolean>(false);
  isPosting = signal<boolean>(false);

  registerForm: FormGroup = this._formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
    ],
    surname: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
    ],
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
      if (this.registerForm.invalid) {
        toast.error('Registro Fallido', {
          duration: 2000,
          description: 'Por Favor, Completa Todos los Campos Requeridos',
          // delete: true,
        });
        return;
      }

      const data: iRegisterRequest = {
        name: this.registerForm.controls['name'].value,
        surname: this.registerForm.controls['surname'].value,
        email: this.registerForm.controls['email'].value,
        password: this.registerForm.controls['password'].value,
        role_id: 2,
      };

      this.isPosting.set(true);

      this._authService.register(data).subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          toast.success('Registro Exitoso', {
            duration: 2000,
            description: 'Bienvenido!',
          });
          this._router.navigateByUrl('/');
          return;
        }
        toast.error('Registro Fallido', {
          duration: 2000,
          description: 'Intentelo Nuevamente',
        });

        this.isPosting.set(false);
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default AuthRegisterPageComponent;
