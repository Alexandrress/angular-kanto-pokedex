import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TrainerService } from '../trainer.service';
import { Credential } from '../credential.model';
import { Token } from '../token.model';
import { environment } from 'src/environments/environment';

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

  constructor(private authService: AuthService, private trainerService: TrainerService) { }

  ngOnInit(): void {
    this.authService.login(this.cred).subscribe(data => { 
      this.authService.setToken(data);
      this.trainerService.getTeam().subscribe(data => { 
        console.log(data);
        this.trainerService.setTeam([11,2,3,4,5,6]).subscribe(data => { 
          console.log(data);
        }); 
      }); 
    });
  }

}
