import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { from } from 'rxjs';
import {
  ProductsService,
  CategoriesService,
  BrandsService,
} from '@admin/services/';
import { generateSlug } from '@shared/utils/generate-slug.util';
import { eProductStatus } from '@admin/enums';
import { iProduct } from '@admin/interfaces';
import { convertStringToArray } from '@shared/utils';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-products-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-products-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProductsFormComponent {
  productId = input.required<number | null>();

  constructor() {
    effect(() => {
      if (!this.isCreateMode() && this.productData.hasValue()) {
        this.form.patchValue({
          code: this.productData.value()?.code,
          name: this.productData.value()?.name,
          slug: this.productData.value()?.slug,
          description: this.productData.value()?.description,
          short_description: this.productData.value()?.short_description,

          price: this.productData.value()?.price,
          sale_price: this.productData.value()?.sale_price,
          cost_price: this.productData.value()?.cost_price,

          stock_quantity: this.productData.value()?.stock_quantity,
          sku: this.productData.value()?.sku,
          barcode: this.productData.value()?.barcode,

          featured: this.productData.value()?.featured,
          status: this.productData.value()?.status,

          category_id: this.productData.value()?.category_id,
          brand_id: this.productData.value()?.brand_id,

          tags: this.productData.value()?.tags || [],
          attributes: this.productData.value()?.attributes || [],
        });
      }
    });
  }
  /*  */
  productStatuses = Object.values(eProductStatus).map((status) => ({
    value: status,
    label: this.getStatusLabel(status),
  }));
  getStatusLabel(status: eProductStatus): string {
    switch (status) {
      case eProductStatus.DRAFT:
        return 'Borrador';
      case eProductStatus.PUBLISHED:
        return 'Publicado';
      case eProductStatus.ARCHIVED:
        return 'Archivado';
      default:
        return status;
    }
  }
  /*  */
  /* Servicios */
  private _productsService: ProductsService = inject(ProductsService);
  private _categoriesService: CategoriesService = inject(CategoriesService);
  private _brandsService: BrandsService = inject(BrandsService);
  /* Servicios */
  private _router: Router = inject(Router);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  /** Señal con la URL actual */
  private readonly currentUrl = signal(this._router.url);
  /** Computed para detectar si es creación */
  isCreateMode = computed<boolean>(() => this.currentUrl().endsWith('/create'));

  public productData = rxResource({
    loader: () => {
      if (this.productId() === null) return from(Promise.resolve(null));
      return this._productsService.getById(this.productId()!);
    },
  });
  public brandData = rxResource({
    loader: () => {
      return this._brandsService.getAll();
    },
  });
  public categoryData = rxResource({
    loader: () => {
      return this._categoriesService.getAll();
    },
  });

  public imagePreview: string | ArrayBuffer | null = null;

  // Opciones para selects
  public statusOptions = [
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
    { value: 'draft', label: 'Borrador' },
  ];

  public form: FormGroup = this._formBuilder.group({
    code: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
    ],
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
      [Validators.required, Validators.minLength(4), Validators.maxLength(500)],
    ],
    short_description: ['', [Validators.maxLength(255)]],
    price: ['', [Validators.required, Validators.min(0)]],
    sale_price: ['', [Validators.min(0)]],
    cost_price: ['', [Validators.min(0)]],
    stock_quantity: [0, [Validators.required, Validators.min(0)]],
    sku: ['', [Validators.maxLength(50)]],
    barcode: ['', [Validators.maxLength(50)]],
    featured: [false],
    status: ['active', [Validators.required]],
    category_id: [null, [Validators.required]],
    brand_id: [null, [Validators.required]],
    tags: [[]],
    attributes: [[]],
    images: [null], // Para el archivo de imagen
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
    this.form.patchValue({ images: file });

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

      const data: iProduct = {
        ...this.form.value,
        tags: convertStringToArray(this.form.value.tags),
        attributes: convertStringToArray(this.form.value.attributes),
        category_id: parseInt(this.form.value.category_id, 10),
        brand_id: parseInt(this.form.value.brand_id, 10),
        price: parseFloat(this.form.value.price),
        sale_price: parseFloat(this.form.value.sale_price || '0'),
        cost_price: parseFloat(this.form.value.cost_price || '0'),
        stock_quantity: parseInt(this.form.value.stock_quantity, 10),
        featured: this.form.value.featured === true,
      };

      if (this.isCreateMode()) {
        this._productsService.create(data).subscribe({
          next: () => {
            toast.success('Registro Creado', {
              description: `El registro: ${this.form.value.name}, se creó correctamente `,
              // description: `El registro: ${data.name}, se creó correctamente `,
              duration: 3000,
            });
            this._router.navigateByUrl('/admin/products');
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
        this._productsService.updateById(this.productId()!, data).subscribe({
          next: () => {
            toast.success('Registro Actualizado', {
              description: `El registro: ${this.form.value.name}, se actualizó correctamente `,
              // description: `El registro: ${data.name}, se actualizó correctamente `,
              duration: 3000,
            });
            this._router.navigateByUrl('/admin/products');
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
export default AdminProductsFormComponent;
