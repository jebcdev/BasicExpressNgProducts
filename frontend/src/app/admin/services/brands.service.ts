import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { iBrand } from '@auth/interfaces';
import { environment } from '@env/environment';
import { catchError, Observable, tap } from 'rxjs';

const API_URL = ` ${environment.apiUrl}/dashboard/brands`;

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private _http: HttpClient = inject(HttpClient);
  public forbidenBrands = computed<number[]>(() => [1, 2, 3]); // This is the list of roles that are not allowed to be deleted or edited. You can change this to whatever you want.

  getAll(): Observable<iBrand[]> {
    return this._http.get<iBrand[]>(API_URL);
  }

  getById(id: number): Observable<iBrand> {
    return this._http.get<iBrand>(`${API_URL}/${id}`);
  }

  // create(data: iBrand): Observable<iBrand> {
  create(data: FormData): Observable<iBrand> {
    return this._http.post<iBrand>(API_URL, data).pipe(
      tap((data) => {
        return data;
      }),
      catchError((error) => {
        console.error('Error creating brand:', error);
        throw error; // Rethrow the error to be handled by the caller
      }),
    );
  }

  updateById(id: number, data: FormData): Observable<iBrand> {
    // updateById(id: number, data: iBrand): Observable<iBrand> {
    return this._http.patch<iBrand>(`${API_URL}/${id}`, data).pipe(
      tap((data) => {
        return data;
      }),
      catchError((error) => {
        console.error('Error updating brand:', error);
        throw error; // Rethrow the error to be handled by the caller
      }),
    );
  }

  deleteById(id: number): Observable<iBrand[]> {
    return this._http.delete<iBrand[]>(`${API_URL}/${id}`);
  }
}
