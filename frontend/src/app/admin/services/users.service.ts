import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { iUser } from '@auth/interfaces';
import { environment } from '@env/environment';
import { toast } from 'ngx-sonner';
import { catchError, Observable, tap } from 'rxjs';

const API_URL = ` ${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _http: HttpClient = inject(HttpClient);

  public forbidenIds: number[] = [1, 2, 3]; // This is the list of roles that are not allowed to be deleted or edited. You can change this to whatever you want.

  getAll(): Observable<iUser[]> {
    return this._http.get<iUser[]>(API_URL);
  }

  getById(id: number): Observable<iUser> {
    return this._http.get<iUser>(`${API_URL}/${id}`);
  }

  create(role: iUser): Observable<iUser> {
    return this._http.post<iUser>(API_URL, role).pipe(
      tap((data) => {
        return data;
      }),
      catchError((error) => {
        console.error('Error creating role:', error);
        throw error; // Rethrow the error to be handled by the caller
      }),
    );
  }

  updateById(id: number, role: iUser): Observable<iUser> {
    const dataId = typeof id === 'string' ? parseInt(id, 10) : id;
    if (this.forbidenIds.includes(dataId)) {
      toast.error('No Puedes Editar Éste Regstro!');
      return new Observable<iUser>();
    }

    return this._http.patch<iUser>(`${API_URL}/${id}`, role).pipe(
      tap((data) => {
        return data;
      }),
      catchError((error) => {
        console.error('Error updating role:', error);
        throw error; // Rethrow the error to be handled by the caller
      }),
    );
  }

  deleteById(id: number): Observable<iUser[]> {
    const dataId = typeof id === 'string' ? parseInt(id, 10) : id;
    if (this.forbidenIds.includes(dataId)) {
      toast.error('No Puedes Editar Éste Regstro!');
      return new Observable<iUser[]>();
    }

    return this._http.delete<iUser[]>(`${API_URL}/${id}`);
  }
}
