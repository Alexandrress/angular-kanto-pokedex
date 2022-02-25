import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon.model';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute } from "@angular/router";
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  pokemon?: Pokemon;

  constructor(private router: Router,
    private actRoute: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location) { }

  ngOnInit(): void {
    if(this.actRoute.snapshot.paramMap.get('id') && Number(this.actRoute.snapshot.paramMap.get('id')) > 0 && Number(this.actRoute.snapshot.paramMap.get('id')) < 152)
      this.pokemonService.getPokemonById(Number(this.actRoute.snapshot.paramMap.get('id'))).subscribe(data => {this.pokemon = data; this.playSound();});
    
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if(Number(event.url.replace(/\D/g,'')) > 0 && Number(event.url.replace(/\D/g,'')) < 152)
          this.pokemonService.getPokemonById(Number(event.url.replace(/\D/g,''))).subscribe(data => {this.pokemon = data; this.playSound();});
    }})
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
