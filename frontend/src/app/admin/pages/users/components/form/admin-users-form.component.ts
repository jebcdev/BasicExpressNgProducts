import { RolesService } from '@admin/services/roles.service';
import { UsersService } from '@admin/services/users.service';
import { CommonModule } from '@angular/common';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  ResourceRef,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { iRole, iUser } from '@auth/interfaces';
import { toast } from 'ngx-sonner';
import { from } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-users-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-users-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUsersFormComponent {
  constructor() {
    // Reactivamente aplicar patchValue cuando llegan los datos
    /*     effect(() => {
      if (!this.isCreateMode() && this.userData.hasValue()) {
        this.form.patchValue({
          name: this.userData.value()?.name!,
          surname: this.userData.value()?.surname!,
          email: this.userData.value()?.email!,
          password: this.userData.value()?.password!,
          role_id: this.userData.value()?.role_id!,
        });

      }
    }); */

    effect(() => {
      const user = this.userData.value();
      const roles = this.rolesResource.value();

      if (!this.isCreateMode() && user && roles) {
        this.form.patchValue({
          name: user.name,
          surname: user.surname,
          email: user.email,
          password: user.password,
          role_id: user.role?.id, // esto ahora sí se aplica bien al <select>
        });
      }
    });
  }
  public isSelected = signal<boolean>(false);
  private _usersService: UsersService = inject(UsersService);
  private _rolesService: RolesService = inject(RolesService);

  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _router: Router = inject(Router);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  /** Señal con la URL actual */
  private readonly currentUrl = signal(this._router.url);
  /** Computed para detectar si es creación */
  isCreateMode = computed<boolean>(() => this.currentUrl().endsWith('/create'));
  /** Computed para extraer el ID si es edición */
  userId = computed(() =>
    this.isCreateMode()
      ? null
      : Number(this._route.snapshot.paramMap.get('id')),
  );

  userData = rxResource({
    loader: () => {
      if (this.userId() === null) {
        return from(Promise.resolve(null)); // Wrap the Promise in an Observable
      }
      return this._usersService.getById(this.userId()!);
    },
  });

  rolesResource: ResourceRef<iRole[] | undefined> = rxResource({
    loader: () => this._rolesService.getAll(),
  });

  public form: FormGroup = this._formBuilder.group({
    name: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    surname: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmation: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    role_id: this._formBuilder.control(null, [
      Validators.required,
      Validators.min(1),
    ]),
  });

  onCleanForm() {
    this.form.reset();
  }

  onSubmit() {
    try {
      if (this.form.invalid) {
        toast.error('Error al Crear el Registro', {
          description: 'Por Favor Verifique los Campos',
          duration: 3000,
        });
        return;
      }

      if (this.form.value.password !== this.form.value.confirmation) {
        toast.error('Error al Crear el Registro', {
          description: 'Las contraseñas no coinciden',
          duration: 3000,
        });
        return;
      }

      const data: iUser = {
        id: this.isCreateMode() ? 0 : this.userId()!,
        name: this.form.value.name,
        surname: this.form.value.surname,
        email: this.form.value.email,
        role_id: Number(this.form.value.role_id),
        password: this.form.value.password,
      };

      if (this.isCreateMode()) {
        this._usersService.create(data).subscribe({
          next: () => {
            toast.success('Registro Creado', {
              description: `El registro: ${data.name}, se creó correctamente `,
              duration: 3000,
            });
            this._router.navigate(['/admin/users']);
          },
          error: (err) => {
            console.error(err);
            toast.error('Error al Crear el Registro', {
              description:
                'Error al crear el registro, por favor intente nuevamente.',
              duration: 3000,
            });
          },
        });
      } else {
        this._usersService.updateById(this.userId()!, data).subscribe({
          next: () => {
            toast.success('Registro Actualizado', {
              description: `El registro: ${data.name}, se actualizó correctamente `,
              duration: 3000,
            });
            this._router.navigate(['/admin/users']);
          },
          error: (err) => {
            console.error(err);
            toast.error('Error al Actualizar el Registro', {
              description:
                'Error al actualizar el registro, por favor intente nuevamente.',
              duration: 3000,
            });
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al Procesar el Registro', {
        description:
          'Error al crear el registro, por favor intente nuevamente.',
        duration: 3000,
      });
    }
  }
}

export default AdminUsersFormComponent;
