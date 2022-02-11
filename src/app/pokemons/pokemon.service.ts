import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pokemon } from './pokemon.model';

export interface PagedData<T> {
  data: T[];
  limit: number;
  offset: number;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.api}pokemons`;
  }

  getPokemons(): Observable<PagedData<Pokemon>> {
    return this.http.get<PagedData<Pokemon>>(this.apiUrl).pipe(tap(() => {this.log("fetched pokemons")},),
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons')));
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.apiUrl + "/" + id).pipe(tap(() => {this.log("fetched pokemon id " + id)},),
      catchError(this.handleError<Pokemon>('getPokemonById')));
  }

  getPokemonsWithQueryParams(limit: number, offset: number): Observable<PagedData<Pokemon>> {
    return this.http.get<PagedData<Pokemon>>(this.apiUrl + "?offset=" + offset + "&limit=" + limit).pipe(tap(() => {this.log("fetched pokemons with query params offset=" + offset + " and limit=" + limit)},),
      catchError(this.handleError<PagedData<Pokemon>>('getPokemonsWithQueryParams')));
  }

  getPokemonsWithSearch(search: string): Observable<PagedData<Pokemon>> {
    return this.http.get<PagedData<Pokemon>>(this.apiUrl + "?search=" + search).pipe(tap(() => {this.log("fetched pokemons by searching '" + search + "'")},),
      catchError(this.handleError<PagedData<Pokemon>>('getPokemonsWithSearch')));
  }

  private log(message: string): void {
    console.log(`PokemonService: ${message}`);
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
