import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { iRole } from '@auth/interfaces';
import { environment } from '@env/environment';
import { toast } from 'ngx-sonner';
import { catchError, Observable, tap } from 'rxjs';

const API_URL = ` ${environment.apiUrl}/roles`;

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private _http: HttpClient = inject(HttpClient);
  public forbidenIds: number[] = [1, 2, 3]; // This is the list of roles that are not allowed to be deleted or edited. You can change this to whatever you want.

  getAll(): Observable<iRole[]> {
    return this._http.get<iRole[]>(API_URL);
  }

  getById(id: number): Observable<iRole> {
    return this._http.get<iRole>(`${API_URL}/${id}`);
  }

  create(role: iRole): Observable<iRole> {
    return this._http.post<iRole>(API_URL, role).pipe(
      tap((data) => {
        return data;
      }),
      catchError((error) => {
        console.error('Error creating role:', error);
        throw error; // Rethrow the error to be handled by the caller
      }),
    );
  }

  updateById(id: number, role: iRole): Observable<iRole> {
    // Check if the role ID is in the forbidden list
    // Asegurarse de que id sea un número
    const dataId = typeof id === 'string' ? parseInt(id, 10) : id;

    // Verificar si el rol está en la lista de prohibidos
    if (this.forbidenIds.includes(dataId)) {
      toast.error('No Puedes Editar Éste Regstro!');
      return new Observable<iRole>();
    }

    return this._http.patch<iRole>(`${API_URL}/${id}`, role).pipe(
      tap((data) => {
        return data;
      }),
      catchError((error) => {
        console.error('Error updating role:', error);
        throw error; // Rethrow the error to be handled by the caller
      }),
    );
  }

  deleteById(id: number): Observable<iRole[]> {
    // Check if the role ID is in the forbidden list
    // Asegurarse de que id sea un número
    const dataId = typeof id === 'string' ? parseInt(id, 10) : id;

    // Verificar si el rol está en la lista de prohibidos
    if (this.forbidenIds.includes(dataId)) {
      toast.error('No Puedes Eliminar Éste Regstro!');
      return new Observable<iRole[]>();
    }
    return this._http.delete<iRole[]>(`${API_URL}/${id}`);
  }
}
