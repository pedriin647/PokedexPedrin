const PokemonName = document.querySelector('.pokemon_name');
const PokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_img');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(apiResponse.status == 200) {
        const data = await apiResponse.json();
        return data;
    }
   
}   

const renderPokemon = async (pokemon) => {

    PokemonName.innerHTML = 'Buscando...';

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonImage.style.display = 'block';
        PokemonName.innerHTML = data.name;
        PokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        PokemonName.innerHTML = 'Não Encontrado :(';
        PokemonNumber.innerHTML = '';
    }
  
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

buttonPrev.addEventListener('click', () => {
    if (searchPokemon>1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }   
})

buttonNext.addEventListener('click', () => {
searchPokemon += 1;
renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon);