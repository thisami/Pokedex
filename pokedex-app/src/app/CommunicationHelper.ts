import { HttpClient } from "@angular/common/http";
import { GenerationInformation } from "src/Entities/GenerationInformation";
import { Pokemon } from "src/Entities/Pokemon";
export class CommunicationHelper {
    public getGeneration(id: number, http: HttpClient): Promise<Pokemon[]> {
        //Step 0.5: Damit ein Aufrufer korrekt mit der Asynchronität des API-Calls umgeht wird hier 
        //ein Promise zurückgegeben. Ist die Asychronität abgeschlossen wird dem Aufrufer mittels
        // resolve mitgeteilt, dass die Asynchronität abgeschlossen ist.
        return new Promise((resolve, reject) => {
            const pokemonFromGeneration: Pokemon[] = [];
            //Step 1: Aufruf der API (asynchron)
            http.get<any>(`https://pokeapi.co/api/v2/generation/${id}`).subscribe((data: any) => {

                //Step 2: Von der Api kommt irgendwas (any) zurück. Dieses irgendwas hat ein Feld namens 
                //"pokemon_species". Dieses Feld nehmen wir und packen es in einen tatsächlichen Typen 
                const pokemonInGeneration: GenerationInformation[] = data.pokemon_species;

                //Step 3) Über die Informationen iterrieren
                pokemonInGeneration.forEach((pokemonFromApi: any) => {

                    //Step 4) Aus den Daten, die von der API kommen, tatsächliche Pokemon machen
                    const newPokemon = new Pokemon(pokemonFromApi.name, pokemonFromApi.url);
                    pokemonFromGeneration.push(newPokemon);
                });
                resolve(pokemonFromGeneration);
            })
        })
    }
}