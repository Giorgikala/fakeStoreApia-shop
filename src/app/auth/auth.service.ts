import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthSecces, SignIn, UserData } from '../core/interface/auth';
import { LocalstorageService } from '../core/service/localstorage.service';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { authToken, rembemberMe } from '../Constants/constats';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends LocalstorageService {
  private apiUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) {
    super();
  }

  authUser(data: SignIn): Observable<UserData> {
    const { rememberUser, ...rest } = data;
    return this.http.post<AuthSecces>(`${this.apiUrl}/auth/login`, data).pipe(
      tap((result) => this.setItem(authToken, result.token)),
      tap((_) => this.setItem(rembemberMe, rememberUser)),
      catchError((err) => throwError(() => new Error(err))),

      map(({ token, ...rest }) => ({ ...rest }))
    );
  }
  isAuthorized(): boolean {
    return this.itemExist(authToken);
  }
  userAlreadyDone() {
    return this.itemExist(authToken) && this.itemExist(rembemberMe);
  }
}
