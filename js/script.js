const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_img');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const type1 = document.querySelector('.type1');
const type2 = document.querySelector('.type2');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) =>{

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status == 200){
        
    const data = await APIResponse.json();
    return data;


    }

}

const renderPokemon = async (pokemon) => {
   
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);

    if (data) {

    type1.innerHTML ="";
    type2.innerHTML = "???"

    pokemonImage.style.display = 'block';
    pokemonNumber.innerHTML = data.id;
    pokemonName.innerHTML = data.name;
    searchPokemon = data.id;
    
    if (searchPokemon > 649){
        pokemonImage.src = data['sprites']['other']['home']['front_default'];
    }else{
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    }   
    input.value = '';
    
    
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
    }

    type1.innerHTML = data['types']['0']['type']['name'];

    if(type2.innerHTML = data['types']['1']['type']['name'] == null){
        type2 = ""
    
    }else{

    type2.innerHTML = data['types']['1']['type']['name'];
    }
}

form.addEventListener('submit', (event) =>{

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
   
});

buttonPrev.addEventListener('click', () =>{
    if (searchPokemon >1) {
    searchPokemon -=1;
    renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click',() =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

document.addEventListener('keydown',(event)=>{
    var theKey = event.key;
    const addPrev = () => {

        if (theKey == 'ArrowLeft') {
        buttonPrev.classList.add('active');
        
        setTimeout(() => {
            buttonPrev.classList.remove('active');
        },100);
        }

        if (searchPokemon >1) {
            searchPokemon -=1;
            renderPokemon(searchPokemon);
            }
    }
    
    const addNext = () => {
        if (theKey == 'ArrowRight'){
        buttonNext.classList.add('active');
        
        setTimeout(() => {
            buttonNext.classList.remove('active');
        },100);
        }

        searchPokemon += 1;
    renderPokemon(searchPokemon);

    }

    if (theKey == 'ArrowLeft'){
        addPrev();
    } if (theKey == 'ArrowRight'){
        addNext();
    }
});

renderPokemon(searchPokemon);