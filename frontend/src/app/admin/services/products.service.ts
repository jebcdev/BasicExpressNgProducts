import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { iProduct } from '@admin/interfaces';
import { environment } from '@env/environment';
import { toast } from 'ngx-sonner';
import { catchError, Observable, tap } from 'rxjs';

const API_URL = ` ${environment.apiUrl}/dashboard/products`;
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _http: HttpClient = inject(HttpClient);
  public forbidenIds: number[] = [1, 2, 3]; // This is the list of roles that are not allowed to be deleted or edited. You can change this to whatever you want.

  getAll(): Observable<iProduct[]> {
    return this._http.get<iProduct[]>(API_URL);
  }

  getById(id: number): Observable<iProduct> {
    return this._http.get<iProduct>(`${API_URL}/${id}`);
  }

  create(data: FormData): Observable<iProduct> {
    return this._http.post<iProduct>(API_URL, data).pipe(
      tap((data) => {
        return data;
      }),
      catchError((error) => {
        console.error('Error creating product:', error);
        throw error; // Rethrow the error to be handled by the caller
      }),
    );
  }

  updateById(id: number, data: FormData): Observable<iProduct> {
    const dataId = typeof id === 'string' ? parseInt(id, 10) : id;

    // Verificar si el rol está en la lista de prohibidos
    if (this.forbidenIds.includes(dataId)) {
      toast.error('No Puedes Editar Éste Regstro!');
      return new Observable<iProduct>();
    }
    return this._http.patch<iProduct>(`${API_URL}/${id}`, data).pipe(
      tap((data) => {
        return data;
      }),
      catchError((error) => {
        console.error('Error updating product:', error);
        throw error; // Rethrow the error to be handled by the caller
      }),
    );
  }

  deleteById(id: number): Observable<iProduct[]> {
    const dataId = typeof id === 'string' ? parseInt(id, 10) : id;

    // Verificar si el rol está en la lista de prohibidos
    if (this.forbidenIds.includes(dataId)) {
      toast.error('No Puedes Editar Éste Regstro!');
      return new Observable<iProduct[]>();
    }
    return this._http.delete<iProduct[]>(`${API_URL}/${id}`);
  }
}
