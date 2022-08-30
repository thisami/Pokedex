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
                let imageReceived: number = 0;
                pokemonInGeneration.forEach((pokemonFromApi: any) => {
                    const pokemonNameInUppercase = pokemonFromApi.name.charAt(0).toUpperCase() + pokemonFromApi.name.slice(1)
                    this.getImage(pokemonFromApi.url, http).then((imageString: string) => {
                        const newPokemon = new Pokemon(pokemonNameInUppercase, pokemonFromApi.url, imageString);
                        pokemonFromGeneration.push(newPokemon);

                        imageReceived = imageReceived + 1;

                        if (imageReceived == pokemonInGeneration.length)
                            resolve(pokemonFromGeneration);

                    })
                });

            })
        })
    }


    private getImage(url: string, http: HttpClient): Promise<string> {

        //1) anhand der URL einen weiteren API-Call machen -> Dort steht die korrekte ID des Pokemon

        return new Promise((resolve, reject) => {
            http.get<any>(url).subscribe((data: any) => {
                //2) Anhand der ID einen dritten API-Call machen -> https://pokeapi.co/api/v2/pokemon/
                http.get<any>(`https://pokeapi.co/api/v2/pokemon/${data.id}/`).subscribe((data: any) => {
                    fetch(data.sprites.front_default)
                        .then(res => {
                            return res.blob()
                        }).then(blob => {
                            resolve(URL.createObjectURL(blob))
                        })
                })
            })
        })
    }

}