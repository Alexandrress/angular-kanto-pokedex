import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.api}trainers`;
  }

  getTeam(): Observable<any> {
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + AuthService.getToken()?.access_token)
    }

    return this.http.get(this.apiUrl + "/me/team", header).pipe(tap(() => {this.log("fetched team")},),
      catchError(this.handleError<any>('getTeam')));
  }

  setTeam(team: number[]): Observable<any> {
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + AuthService.getToken()?.access_token)
    }

    return this.http.put(this.apiUrl + "/me/team", team, header).pipe(tap(() => {this.log("setted team")},),
      catchError(this.handleError<any>('setTeam')));
  }

  create(newUser: Credential): Observable<any> {
    return this.http.post(this.apiUrl, newUser).pipe(
      tap(_ => this.log(`create`)),
      catchError(this.handleError<any>('create error'))
    );
  }

  private log(message: string): void {
    console.log(`TrainerService: ${message}`);
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
