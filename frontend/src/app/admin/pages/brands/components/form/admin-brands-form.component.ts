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
import { toast } from 'ngx-sonner';
import { from } from 'rxjs';
import { BrandsService } from '@admin/services/';
import { generateSlug } from '@shared/utils/generate-slug.util';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-brands-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-brands-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBrandsFormComponent {
  constructor() {
    effect(() => {
      if (!this.isCreateMode() && this.brandData.hasValue()) {
        this.form.patchValue({
          name: this.brandData.value()?.name,
          slug: this.brandData.value()?.slug,
          description: this.brandData.value()?.description,
          image: this.brandData.value()?.image,
        });
      }
    });
  }
  /* - */
  private _brandsService: BrandsService = inject(BrandsService);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _router: Router = inject(Router);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  /** Señal con la URL actual */
  private readonly currentUrl = signal(this._router.url);
  /** Computed para detectar si es creación */
  isCreateMode = computed<boolean>(() => this.currentUrl().endsWith('/create'));
  /** Computed para extraer el ID si es edición */
  brandId = computed(() =>
    this.isCreateMode()
      ? null
      : Number(this._route.snapshot.paramMap.get('id')),
  );

  public brandData = rxResource({
    loader: () => {
      if (this.brandId() === null) return from(Promise.resolve(null));
      return this._brandsService.getById(this.brandId()!);
    },
  });

  public imagePreview: string | ArrayBuffer | null = null;

  public form: FormGroup = this._formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(100)],
    ],
    slug: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(255)],
    ],
    description: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(255)],
    ],
    image: [null], // Nuevo control para el archivo de imagen
  });

  onNameChanged(event: Event) {
    try {
      const name: string = (event.target as HTMLInputElement).value;
      const slug: string = generateSlug(name);
      this.form.patchValue({
        slug: slug,
      });
    } catch (error) {
      console.error(error);
      toast.error('Error al Generar Slug', {
        description: 'Error al generar slug, por favor intente nuevamente.',
        duration: 3000,
      });
    }
  }

  onCleanForm() {
    this.form.reset();
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    // Validar que el archivo sea una imagen
    if (!file.type.startsWith('image/')) {
      toast.error('Archivo inválido', {
        description: 'Por favor, selecciona un archivo de imagen válido.',
        duration: 3000,
      });
      return;
    }

    // Asignar el archivo al control del formulario
    this.form.patchValue({ image: file });

    // Generar vista previa de la imagen
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
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

      const data = new FormData();
      data.append('name', this.form.value.name);
      data.append('slug', this.form.value.slug);
      data.append('description', this.form.value.description);

      const imageFile = this.form.get('image')?.value;
      if (imageFile) {
        data.append('image', imageFile);
      }
      // console.log(data);
      if (this.isCreateMode()) {
        this._brandsService.create(data).subscribe({
          next: () => {
            toast.success('Registro Creado', {
              description: `El registro: ${this.form.value.name}, se creó correctamente `,
              // description: `El registro: ${data.name}, se creó correctamente `,
              duration: 3000,
            });
            this._router.navigateByUrl('/admin/brands');
          },
          error: (err: unknown) => {
            console.error(err);
            toast.error('Error al Crear el Registro', {
              description:
                'Error al crear el registro, por favor intente nuevamente.',
              duration: 3000,
            });
          },
        });
      } else {
        this._brandsService.updateById(this.brandId()!, data).subscribe({
          next: () => {
            toast.success('Registro Actualizado', {
              description: `El registro: ${this.form.value.name}, se actualizó correctamente `,
              // description: `El registro: ${data.name}, se actualizó correctamente `,
              duration: 3000,
            });
            this._router.navigateByUrl('/admin/brands');
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

export default AdminBrandsFormComponent;
