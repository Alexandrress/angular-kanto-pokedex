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

  constructor(private pokemonService: PokemonService) { }

	ngOnInit(): void {
		this.pokemonService.getPokemonsWithQueryParams(151,0).subscribe(data => { this.pokemons = data.data; } );
	}

  onScroll() {
    console.log('Scrolled!!');
  }
}