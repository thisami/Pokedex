import { HttpClient } from "@angular/common/http";
import { GenerationInformation } from "src/Entities/GenerationInformation";
import { Pokemon } from "src/Entities/Pokemon";
import { PokemonInformation } from "src/Entities/PokemonInformation";

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
                let imageReceived: number = 0;
                pokemonInGeneration.forEach((pokemonFromApi: any) => {
                    const pokemonNameInUppercase = pokemonFromApi.name.charAt(0).toUpperCase() + pokemonFromApi.name.slice(1)

                    this.getInformation(pokemonFromApi.url, http).then((pokeInfo: PokemonInformation) => {
                        this.getImage(pokeInfo.pokeId, http).then((imageString: string) => {
                            const newPokemon = new Pokemon(pokeInfo.pokeId, pokemonNameInUppercase, pokemonFromApi.url, imageString, pokeInfo.pokeTypes, pokeInfo.pokemonTypeInUppercase, pokeInfo.pokeTyp);
                            pokemonFromGeneration.push(newPokemon);

                            imageReceived = imageReceived + 1;

                            if (imageReceived == pokemonInGeneration.length)
                                resolve(pokemonFromGeneration);
                        })
                    })
                });
            })
        })
    }

    private getInformation(url: string, http: HttpClient): Promise<PokemonInformation> {
        return new Promise((resolve, reject) => {
            http.get<any>(url).subscribe((data: any) => {
                http.get<any>(`https://pokeapi.co/api/v2/pokemon/${data.id}/`).subscribe((data: any) => {
                    const typeForPokemon: string[] = [];
                    data.types.forEach((element: any) => {
                        typeForPokemon.push(element.type.name);



                    });
                    const type: string = typeForPokemon.join(", ")

                    const pokemonTypeInUppercase = type.charAt(0).toUpperCase() + type.slice(1)
                    const specificInformation = new PokemonInformation(data.id, typeForPokemon, type, pokemonTypeInUppercase)
                    resolve(specificInformation);
                })
            })
        })
    }



    private getImage(id: number, http: HttpClient): Promise<string> {
        //1) anhand der URL einen weiteren API-Call machen -> Dort steht die korrekte ID des Pokemon
        return new Promise((resolve, reject) => {
            //2) Anhand der ID einen dritten API-Call machen -> https://pokeapi.co/api/v2/pokemon/
            http.get<any>(`https://pokeapi.co/api/v2/pokemon/${id}/`).subscribe((data: any) => {
                resolve(data.sprites.other.home.front_default);
            })
        })
    }
}

