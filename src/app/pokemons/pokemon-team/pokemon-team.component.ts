import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TrainerService } from '../trainer.service';
import { Credential } from '../credential.model';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../pokemon.model';
import { PokemonService } from '../pokemon.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pokemon-team',
  templateUrl: './pokemon-team.component.html',
  styleUrls: ['./pokemon-team.component.scss']
})
export class PokemonTeamComponent implements OnInit {

  cred: Credential = {
    email: environment.mail,
    password: environment.mdp
  };

  pokemons: Pokemon[] = [];

  constructor(private authService: AuthService, private trainerService: TrainerService, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.authService.login(this.cred).subscribe(data => { 
      this.authService.setToken(data);
      this.trainerService.getTeam().subscribe(data => { 
        this.trainerService.teamIds = data;
        this.getPokemonTeamById();

        this.trainerService.teamChange$.subscribe(
          data => {
            this.getPokemonTeamById();
        });
      }); 
    });
  }

  getPokemonTeamById(){
    this.pokemons = [];

    forkJoin(this.trainerService.teamIds.map(id => this.pokemonService.getPokemonById(id).subscribe(data => 
    {
      this.pokemons.push(data);
    })));
  }
}
