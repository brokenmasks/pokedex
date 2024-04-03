
const btn_prev = document.querySelector('.btn_prev');
const btn_next = document.querySelector('.btn_next');
const form = document.querySelector('form');
const input = document.querySelector('.input_search');

const pokemonImage = document.querySelector('.pokemon_img');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonName = document.querySelector('.pokemon_name');

let idSearch = 1;


const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    };
};

form.addEventListener('submit', (event) =>{
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    
});

btn_prev.addEventListener('click', () =>{
    if(idSearch > 1){
    idSearch -= 1;
    renderPokemon(idSearch);
    };
});

btn_next.addEventListener('click', () =>{
    idSearch += 1;
    renderPokemon(idSearch);
});

const renderPokemon = async (pokemon) =>{
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    
    if (data){
        pokemonImage.style.display = 'block';
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonNumber.innerHTML = data.id + ' -';
        pokemonName.innerHTML = data.name;
        input.value = '';
        idSearch = data.id;
    } else{
        pokemonImage.style.display = 'none';
        pokemonNumber.innerHTML = '';
        pokemonName.innerHTML = 'Not Found';
        input.value = '';
    }
};

renderPokemon(idSearch);