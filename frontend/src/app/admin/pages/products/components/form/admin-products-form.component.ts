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

  // Cambiar de imagePreview a imagePreviews para múltiples imágenes
  public imagePreviews: string[] = [];
  public selectedFiles: File[] = [];

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
    price: ['', [Validators.required, Validators.min(0.01)]],
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
    // images: [null], // Para el archivo de imagen
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

  // Validación de lógica de precios
  private validatePriceLogic(): { isValid: boolean; errors: string[] } {
    const price = parseFloat(this.form.value.price) || 0;
    const salePrice = parseFloat(this.form.value.sale_price) || 0;
    const costPrice = parseFloat(this.form.value.cost_price) || 0;

    const errors: string[] = [];

    // Validar que el precio de venta sea menor que el precio regular
    if (salePrice > 0 && salePrice >= price) {
      errors.push('El precio en oferta debe ser menor que el precio regular');
    }

    // Validar que el precio de costo sea menor que el precio regular
    if (costPrice > 0 && costPrice >= price) {
      errors.push('El precio de costo debe ser menor que el precio regular');
    }

    // Validar que el precio de costo sea menor que el precio de venta
    if (salePrice > 0 && costPrice > 0 && costPrice >= salePrice) {
      errors.push('El precio de costo debe ser menor que el precio en oferta');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Nueva función para manejar múltiples imágenes
  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const files = Array.from(input.files);

    // Validar número máximo de archivos
    if (files.length > 10) {
      toast.error('Demasiadas imágenes', {
        description: 'Máximo 10 imágenes permitidas.',
        duration: 3000,
      });
      return;
    }

    // Validar que todos los archivos sean imágenes
    const invalidFiles = files.filter(
      (file) => !file.type.startsWith('image/'),
    );
    if (invalidFiles.length > 0) {
      toast.error('Archivos inválidos', {
        description: 'Solo se permiten archivos de imagen.',
        duration: 3000,
      });
      return;
    }

    // Validar tamaño de archivos (5MB máximo por archivo)
    const oversizedFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error('Archivos muy grandes', {
        description: 'Cada imagen debe ser menor a 5MB.',
        duration: 3000,
      });
      return;
    }

    // Guardar archivos seleccionados
    this.selectedFiles = files;

    // Generar vistas previas
    this.imagePreviews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  // Función para remover vista previa de imagen
  removeImagePreview(index: number): void {
    this.imagePreviews.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  // Validar precios en tiempo real
  onPriceChange(field: string, event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    // Actualizar el campo correspondiente
    this.form.patchValue({ [field]: value });

    // Validar después de un pequeño delay para no spam
    setTimeout(() => {
      this.validatePricesInRealTime();
    }, 300);
  }

  private validatePricesInRealTime(): void {
    const validation = this.validatePriceLogic();

    if (!validation.isValid && validation.errors.length > 0) {
      // Solo mostrar toast si hay valores en los campos
      const price = parseFloat(this.form.value.price) || 0;
      const salePrice = parseFloat(this.form.value.sale_price) || 0;
      const costPrice = parseFloat(this.form.value.cost_price) || 0;

      if (price > 0 && (salePrice > 0 || costPrice > 0)) {
        toast.warning('Advertencia en Precios', {
          description: validation.errors[0], // Solo mostrar el primer error
          duration: 2000,
        });
      }
    }
  }

  // Obtener errores de validación de precios para mostrar en la UI
  getPriceValidationErrors(): string[] {
    const validation = this.validatePriceLogic();
    return validation.errors;
  }

  // Verificar si hay errores de precios
  hasPriceErrors(): boolean {
    return !this.validatePriceLogic().isValid;
  }

  onSubmit() {
    try {
      if (this.form.invalid) {
        toast.error('Error al Crear el Registro', {
          description: 'Por Favor Verifique los Campos',
          duration: 3000,
        });
        // Recorrer todos los controles del formulario
        Object.keys(this.form.controls).forEach((key) => {
          const control = this.form.get(key);

          if (control && control.errors) {
            console.log(`Error en el campo ${key}:`, control.errors);
          }
        });
        return;
      }

      // Validar lógica de precios
      const priceValidation = this.validatePriceLogic();
      if (!priceValidation.isValid) {
        toast.error('Error en los Precios', {
          description: priceValidation.errors.join('. '),
          duration: 4000,
        });
        return;
      }

      /*  const data: iProduct = {
        id: 0, // Si es nuevo producto, si es edición coloca el ID correspondiente
        code: this.form.value.code,
        name: this.form.value.name,
        slug: this.form.value.slug,
        description: this.form.value.description,
        short_description: this.form.value.short_description || '', // Asignación con valor por defecto
        images: this.form.value.images || [], // Valor por defecto array vacío
        price: parseFloat(this.form.value.price).toString(),
        sale_price: this.form.value.sale_price
          ? parseFloat(this.form.value.sale_price).toString()
          : '0',
        cost_price: this.form.value.cost_price
          ? parseFloat(this.form.value.cost_price).toString()
          : '0',
        stock_quantity: parseInt(this.form.value.stock_quantity, 10),
        sku: this.form.value.sku || '',
        barcode: this.form.value.barcode || '',
        featured: !!this.form.value.featured, // Conversión a booleano
        status: this.form.value.status,
        category_id: parseInt(this.form.value.category_id, 10),
        brand_id: parseInt(this.form.value.brand_id, 10),
        tags: this.form.value.tags
          ? convertStringToArray(this.form.value.tags)
          : [],
        attributes: this.form.value.attributes
          ? convertStringToArray(this.form.value.attributes)
          : [],
      }; */

      // Crear FormData para envío con imágenes
      const data = new FormData();

      // Agregar campos del formulario
      data.append('code', this.form.value.code);
      data.append('name', this.form.value.name);
      data.append('slug', this.form.value.slug);
      data.append('description', this.form.value.description);
      data.append('short_description', this.form.value.short_description || '');
      data.append('price', this.form.value.price);
      data.append('sale_price', this.form.value.sale_price || '');
      data.append('cost_price', this.form.value.cost_price || '');
      data.append('stock_quantity', this.form.value.stock_quantity);
      data.append('sku', this.form.value.sku || '');
      data.append('barcode', this.form.value.barcode || '');
      data.append('featured', this.form.value.featured.toString());
      data.append('status', this.form.value.status);
      data.append('category_id', this.form.value.category_id);
      data.append('brand_id', this.form.value.brand_id);

      // Manejar tags y attributes como strings separados por comas
      const tags = convertStringToArray(this.form.value.tags);
      const attributes = convertStringToArray(this.form.value.attributes);

      data.append('tags', JSON.stringify(tags));
      data.append('attributes', JSON.stringify(attributes));

      // Agregar imágenes
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.selectedFiles.forEach((file, index) => {
        data.append('images', file);
      });

      console.log('FormData preparado para envío');
      console.log(data);

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
