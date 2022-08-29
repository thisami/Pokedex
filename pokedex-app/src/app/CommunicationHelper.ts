import { HttpClient } from "@angular/common/http";
export class CommunicationHelper {
    public getGeneration(id: number, http: HttpClient) {
        http.get<any>(`https://pokeapi.co/api/v2/generation/${id}`).subscribe(data => {
            data.pokemon_species.forEach((pokemon: any) => {
                console.log(pokemon.name);

            });
        })
    }
}