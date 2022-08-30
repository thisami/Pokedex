import { Component } from '@angular/core';
import { CommunicationHelper } from './CommunicationHelper';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from 'src/Entities/Pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'pokedex';
  public pokemon: Pokemon[] = [];
  constructor(private http: HttpClient) { }

  // "picture" in getGeneration rein?
  getGeneration(id: number) {
    this.pokemon.splice(0)
    const comHelper = new CommunicationHelper()
    comHelper.getGeneration(id, this.http).then((pokemon: Pokemon[]) => {
      pokemon.forEach(element => {
        this.pokemon.push(element)
        console.log(this.pokemon);
      })


    }).catch(() => {
      console.error("Irgendwas ging daneben...");
    })
  }
}