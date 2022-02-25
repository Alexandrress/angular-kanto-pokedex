import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon.model';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons?: Pokemon[];
  search : string = "";
  hasSearched : boolean = false;

  limit = 20;
  offset = 0;

  constructor(private pokemonService: PokemonService) { }

	ngOnInit(): void {
		this.pokemonService.getPokemonsWithQueryParams(this.limit,this.offset).subscribe(data => { this.pokemons = data.data; } );
	}

  searchPokemon(){
    if(this.search)
      this.pokemonService.getPokemonsWithSearch(this.search).subscribe(data => { this.pokemons = data.data; this.hasSearched = true; } );
    else{
      this.offset = 0;
      this.hasSearched = false;
      this.pokemonService.getPokemonsWithQueryParams(this.limit,this.offset).subscribe(data => { 
        this.pokemons = data.data; 
      } );
    }
  }

  onScroll() {
    if(!this.hasSearched)
    {
      if(this.offset == 0)
        this.offset = 20;
      else
        this.offset += 5;

      this.getNextPokemons();
    }
  }

  getNextPokemons(){
    this.pokemonService.getPokemonsWithQueryParams(5,this.offset).subscribe(data => { 
      this.pokemons = this.pokemons?.concat(data.data);
    } );
  }
}
