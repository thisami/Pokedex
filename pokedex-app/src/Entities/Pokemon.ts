export class Pokemon {
    constructor(readonly pokeId: number, public name: string, public url: string, readonly image: string, readonly pokeTypes: string[], readonly pokeTyp: string, readonly pokemonTypeInUppercase: string) {

    }
}