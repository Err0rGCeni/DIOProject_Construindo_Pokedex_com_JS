
const pokeApi = {}
//Simplificar o modelo da pokeApi
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    //Array destruct
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        //Converter http response para JSON
        .then((response) => response.json())
        //Utilizar apenas results do JSON
        .then((jsonBody) => jsonBody.results)
        //Mapear lista de pokemons para lista de requisições
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        //Aguardar toda a lista de requisições terminar
        .then((detailRequests) => Promise.all((detailRequests)))
        //Utilizar uma lista de detalhes dos pokemons
        .then((pokemonsDetails) => pokemonsDetails)
}

Promise.all([
    fetch('https://pokeapi.co/api/v2/pokemon/1'),
    fetch('https://pokeapi.co/api/v2/pokemon/2'),
    fetch('https://pokeapi.co/api/v2/pokemon/3'),
    fetch('https://pokeapi.co/api/v2/pokemon/4')
]).then((results)=>{
    console.log(results)
})