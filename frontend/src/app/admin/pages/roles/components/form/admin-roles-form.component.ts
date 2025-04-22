import { RolesService } from '@admin/services/roles.service';
import { CommonModule } from '@angular/common';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
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
import { iRole } from '@auth/interfaces';
import { toast } from 'ngx-sonner';
import { from } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-roles-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-roles-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminRolesFormComponent {
  constructor() {
    // Reactivamente aplicar patchValue cuando llegan los datos
    effect(() => {
      if (!this.isCreateMode() && this.roleData.hasValue()) {
        this.form.patchValue({
          name: this.roleData.value()?.name,
          description: this.roleData.value()?.description,
        });
      }
    });
  }

  private _rolesService: RolesService = inject(RolesService);

  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _router: Router = inject(Router);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  /** Señal con la URL actual */
  private readonly currentUrl = signal(this._router.url);
  /** Computed para detectar si es creación */
  isCreateMode = computed<boolean>(() => this.currentUrl().endsWith('/create'));
  /** Computed para extraer el ID si es edición */
  roleId = computed(() =>
    this.isCreateMode()
      ? null
      : Number(this._route.snapshot.paramMap.get('id')),
  );

  roleData = rxResource({
    loader: () => {
      if (this.roleId() === null) {
        return from(Promise.resolve(null)); // Wrap the Promise in an Observable
      }
      return this._rolesService.getById(this.roleId()!);
    },
  });

  public form: FormGroup = this._formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(100)],
    ],
    description: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(255)],
    ],
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

      const data: iRole = {
        id: this.isCreateMode() ? 0 : this.roleId()!,
        name: this.form.value.name,
        description: this.form.value.description,
      };

      if (this.isCreateMode()) {
        this._rolesService.create(data).subscribe({
          next: () => {
            toast.success('Registro Creado', {
              description: `El registro: ${data.name}, se creó correctamente `,
              duration: 3000,
            });
            this._router.navigate(['/admin/roles']);
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
        this._rolesService.updateById(this.roleId()!, data).subscribe({
          next: () => {
            toast.success('Registro Actualizado', {
              description: `El registro: ${data.name}, se actualizó correctamente `,
              duration: 3000,
            });
            this._router.navigate(['/admin/roles']);
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

export default AdminRolesFormComponent;
