import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { toast } from 'ngx-sonner';
import { effect } from '@angular/core';
import { iUser } from '@auth/interfaces';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'private-profile-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './private-profile-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateProfilePageComponent {
  constructor() {
    // Efecto para inicializar el formulario cuando currentUser cambie
    effect(() => {
      const user = this.currentUser();
      if (user) {
        this.profileForm.patchValue({
          name: user.name || '',
          surname: user.surname || '',
          email: user.email || '',
          password: '', // Por seguridad, no rellenes el password
        });
      }
    });
  }
  private _authService: AuthService = inject(AuthService);
  currentUser = computed(() => this._authService.user());

  private _router: Router = inject(Router);
  private _formBuilder: FormBuilder = inject(FormBuilder);

  hasError = signal<boolean>(false);
  isPosting = signal<boolean>(false);

  profileForm: FormGroup = this._formBuilder.group({
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
      if (this.profileForm.invalid) {
        /* errores */
        /*         const controls = this.profileForm.controls;
        let errorMsg = 'Por Favor, Completa Todos los Campos Requeridos';
      
        if (controls['name'].errors) {
          if (controls['name'].errors['required']) errorMsg = 'El nombre es obligatorio';
          else if (controls['name'].errors['minlength']) errorMsg = 'El nombre debe tener al menos 4 caracteres';
          else if (controls['name'].errors['maxlength']) errorMsg = 'El nombre es demasiado largo';
        } else if (controls['surname'].errors) {
          if (controls['surname'].errors['required']) errorMsg = 'El apellido es obligatorio';
          else if (controls['surname'].errors['minlength']) errorMsg = 'El apellido debe tener al menos 4 caracteres';
          else if (controls['surname'].errors['maxlength']) errorMsg = 'El apellido es demasiado largo';
        } else if (controls['email'].errors) {
          if (controls['email'].errors['required']) errorMsg = 'El email es obligatorio';
          else if (controls['email'].errors['pattern']) errorMsg = 'El email no es válido';
        } else if (controls['password'].errors) {
          if (controls['password'].errors['required']) errorMsg = 'La contraseña es obligatoria';
          else if (controls['password'].errors['minlength']) errorMsg = 'La contraseña debe tener al menos 8 caracteres';
        }
        
        console.log(errorMsg); */
        /* errores */
        toast.error('Actualización Fallida', {
          duration: 2000,
          description: 'Por Favor, Completa Todos los Campos Requeridos',
          // delete: true,
        });
        return;
      }

      const data: iUser = {
        name: this.profileForm.controls['name'].value,
        surname: this.profileForm.controls['surname'].value,
        email: this.profileForm.controls['email'].value,
        password: this.profileForm.controls['password'].value,
        role_id: this.currentUser()?.role_id,
        created_at: this.currentUser()?.created_at,
      };

      console.log(data);

      this.isPosting.set(true);

      this._authService.updateProfile(data).subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          toast.success('Actualización Exitosa!', {
            duration: 2000,
            description: 'Bienvenido Nuevamente',
          });
          this._router.navigateByUrl('/');
          return;
        }
        toast.error('Actualización Fallida', {
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

export default PrivateProfilePageComponent;
