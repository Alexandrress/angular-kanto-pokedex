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

  constructor(private pokemonService: PokemonService) { }

	ngOnInit(): void {
		this.pokemonService.getPokemonsWithQueryParams(151,0).subscribe(data => { this.pokemons = data.data; } );
	}

  searchPokemon(){
    if(this.search)
      this.pokemonService.getPokemonsWithSearch(this.search).subscribe(data => { this.pokemons = data.data; } );
    else
      this.pokemonService.getPokemonsWithQueryParams(151,0).subscribe(data => { this.pokemons = data.data; } );
  }

  onScroll() {
    console.log('Scrolled!!');
  }
}
