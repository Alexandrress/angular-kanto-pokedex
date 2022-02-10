import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon.model';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common'

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  pokemon?: Pokemon;

  constructor(private actRoute: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonById(Number(this.actRoute.snapshot.paramMap.get('id'))).subscribe(data => {this.pokemon = data;});
  }

  playSound(){
    let audio = new Audio();
    audio.src = "../../../assets/audio/" + this.pokemon?.id + ".mp3";
    audio.load();
    audio.play();
  }

  goBack(){
  	this.location.back();
  }

}
