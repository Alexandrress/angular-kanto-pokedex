import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Credential } from './credential.model';
import { Token } from './token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl;

  private static token?: Token;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.api}auth`;
  }

  login(userCredential: Credential): Observable<any> {
    return this.http.post(this.apiUrl + "/login", userCredential).pipe(
      tap(_ => this.log(`login`)),
      catchError(this.handleError<any>('login error'))
    );
  }

  refresh(refreshToken: String): Observable<any> {
    return this.http.post(this.apiUrl + "/refresh", refreshToken).pipe(
      tap(_ => this.log(`refresh`)),
      catchError(this.handleError<any>('refresh error'))
    );   
  }

  public setToken(token: Token){
    AuthService.token = token;
  }

  public static getToken(){
    return this.token;
  }

  private log(message: string): void {
    console.log(`AuthService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
