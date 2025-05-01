import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { iCategory } from '@auth/interfaces';
import { environment } from '@env/environment';
import { catchError, Observable, tap } from 'rxjs';

const API_URL = ` ${environment.apiUrl}/dashboard/categories`;

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private _http: HttpClient = inject(HttpClient);
  public forbidenRCategories = computed<number[]>(() => [1, 2, 3]); // This is the list of roles that are not allowed to be deleted or edited. You can change this to whatever you want.

  getAll(): Observable<iCategory[]> {
    return this._http.get<iCategory[]>(API_URL);
  }

  getById(id: number): Observable<iCategory> {
    return this._http.get<iCategory>(`${API_URL}/${id}`);
  }

  create(data: iCategory): Observable<iCategory> {
    return this._http.post<iCategory>(API_URL, data).pipe(
      tap((data) => {
        return data;
      }),
      catchError((error) => {
        console.error('Error creating category:', error);
        throw error; // Rethrow the error to be handled by the caller
      }),
    );
  }

  updateById(id: number, data: iCategory): Observable<iCategory> {
    return this._http.patch<iCategory>(`${API_URL}/${id}`, data).pipe(
      tap((data) => {
        return data;
      }),
      catchError((error) => {
        console.error('Error updating category:', error);
        throw error; // Rethrow the error to be handled by the caller
      }),
    );
  }

  deleteById(id: number): Observable<iCategory[]> {
    return this._http.delete<iCategory[]>(`${API_URL}/${id}`);
  }
}
