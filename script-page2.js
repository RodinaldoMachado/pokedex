const divtipos = document.querySelector('.types')
const btProx = document.getElementById('prox')
const btAnt = document.getElementById('ant')  
const imgPokemon = document.querySelector('.img-pokemon')
const divInfos = document.querySelector('#informacoes')
const divPokemon = document.querySelector('.pokemon')
const namePokemon = document.querySelector('.name-pokemon')
const btProximoPokemon = document.querySelector('.proximo')
const btPokemonAnterior = document.querySelector('.anterior')
const title = document.querySelector('title')
const NumPokemon = document.querySelector('.numero-pokemon')


var imagens = []
let btProximo = ''
let pokemonID = localStorage.getItem('pokemonID')
let index = 0
let corFundo = ''
let corLetra = ''


var cores = {
    grass:'darkgreen',
    poison:'darkviolet',
    fire:'orangered',
    flying:'lightskyblue',
    water:'blue',
    bug:'darkolivegreen',
    normal:'#ccc',
    electric:'gold',
    ground:'saddlebrown',
    fairy:'pink',
    figthing: 'firebrick',
    psychic:'lightcoral',
    rock:'dimgray',
    steel:'lightslategray',
    ice:'lightsteelblue',
    ghost:'indigo',
    dragon:'navy',
    dark:'black',
    black:'black',
    white:'white'

}

function fundoPorTipo(tipo) {
    let corPorTipo = tipo
    if (corPorTipo == 'grass') {
        corFundo = cores.grass
        corLetra = cores.white
    }else if (corPorTipo == 'poison') {
        corFundo = cores.poison
        corLetra = cores.white
    }else if (corPorTipo == 'fire') {
        corFundo = cores.fire
        corLetra = cores.white
    }else if (corPorTipo == 'flying') {
        corFundo = cores.flying
        corLetra = cores.black
    }else if (corPorTipo == 'water') {
        corFundo = cores.water
        corLetra = cores.white
    }else if (corPorTipo == 'bug') {
        corFundo = cores.bug
        corLetra = cores.white
    }else if (corPorTipo == 'normal') {
        corFundo = cores.normal
        corLetra = cores.black
    }else if (corPorTipo == 'electric') {
        corFundo = cores.electric
        corLetra = cores.black
    }else if (corPorTipo == 'ground') {
        corFundo = cores.ground
        corLetra = cores.white
    }else if (corPorTipo == 'fairy') {
        corFundo = cores.fairy
        corLetra = cores.black
    }else if (corPorTipo == 'fighting') {
        corFundo = cores.figthing
        corLetra = cores.white
    }else if (corPorTipo == 'psychic') {
        corFundo = cores.psychic
        corLetra = cores.black
    }else if (corPorTipo == 'rock') {
        corFundo = cores.rock
        corLetra = cores.white
    }else if (corPorTipo == 'steel') {
        corFundo = cores.steel
        corLetra = cores.white
    }else if (corPorTipo == 'ice') {
        corFundo = cores.ice
        corLetra = cores.black
    }else if (corPorTipo == 'ghost') {
        corFundo = cores.ghost
        corLetra = cores.white
    }else if (corPorTipo == 'dragon') {
        corFundo = cores.dragon
        corLetra = cores.white
    }else if (corPorTipo == 'dark') {
        corFundo = cores.dark
        corLetra = cores.white
    }

}


async function buscaPokemon(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    return data;
}

function pegarImagens(pokemon) {
    if (pokemon.sprites.other['official-artwork'].front_default != null) {
        imagens.push(pokemon.sprites.other['official-artwork'].front_default)
    }
    if (pokemon.sprites.other['official-artwork'].front_shiny != null) {
        imagens.push(pokemon.sprites.other['official-artwork'].front_shiny)
    }
    if (pokemon.sprites.front_default != null) {
        imagens.push(pokemon.sprites.front_default)
    }
    if (pokemon.sprites.front_shiny != null) {
        imagens.push(pokemon.sprites.front_shiny)
    }
    if (pokemon.sprites.other.home.front_default != null) {
        imagens.push(pokemon.sprites.other.home.front_default)
    }
    if (pokemon.sprites.other.home.front_shiny != null) {
        imagens.push(pokemon.sprites.other.home.front_shiny)
    }
    if (pokemon.sprites.versions['generation-v']['black-white'].animated.front_default != null) {
        imagens.push(pokemon.sprites.versions['generation-v']['black-white'].animated.front_default)
    }
    if (pokemon.sprites.versions['generation-v']['black-white'].animated.front_shiny != null) {
        imagens.push(pokemon.sprites.versions['generation-v']['black-white'].animated.front_shiny)
    }
}

async function mostrarPokemon(id) {
    var pokemon = await buscaPokemon(id)
    pegarImagens(pokemon)
    title.innerHTML = `PokeDex ${pokemon.name}`
    let nomeLetraMaiuscula = pokemon.name[0].toUpperCase() + pokemon.name.substring(1)
    namePokemon.innerHTML = nomeLetraMaiuscula
    NumPokemon.innerHTML = `Num: ${pokemon.id}`
    imgPokemon.src = imagens[0]
    divtipos.innerHTML = pegarTipos(pokemon)
    divInfos.innerHTML = `
    <div class="infos">
    <p class="hp">Hp: ${pokemon.stats[0].base_stat}</p>
    <p class="speed">Velocidade: ${pokemon.stats[5].base_stat}</p>
    
    </div>
            <div class="infos">
                <p class="ataque">Ataque: ${pokemon.stats[1].base_stat}</p>
                <p class="defesa">Defesa: ${pokemon.stats[2].base_stat}</p>
                
                </div>
                <div class="infos">
                <p class="ataque-esp">Ataq. especial: ${pokemon.stats[3].base_stat}</p>
                <p class="defesa-esp">Def. especial: ${pokemon.stats[4].base_stat}</p>
                
                </div>    
                
                
                `
}


function  pegarTipos(pokemon) {
    let tipo = []
    let divTi = []
    
    for(let a =0; a < pokemon.types.length; a++){
        tipo.push(pokemon.types[a].type.name)
    }
    for (let a = 0; a < tipo.length; a++) {
        fundoPorTipo(tipo[a])

        divTi[a] = `
                <div style="background:${corFundo};color:${corLetra}">
                    <p>${tipo[a]}</p>
                </div>
         `
         
        }
        

    return divTi.join(' ')
}


            
mostrarPokemon(pokemonID)


btProx.addEventListener('click',()=>{
        if (index == imagens.length - 1) {
            btProx.disabled = true
        }else{
            index++
            imgPokemon.src = imagens[index]
            btAnt.disabled = false

        }
})

btAnt.addEventListener('click',()=>{
       if (index == 0 ) {
           btAnt.disabled = true
           
    }else{
           btProx.disabled = false
              index--
              imgPokemon.src = imagens[index]
       }
       
})

btProximoPokemon.addEventListener('click',()=>{
    pokemonID++
    imagens.splice(0)
    index = 0
    mostrarPokemon(pokemonID)
    
})

btPokemonAnterior.addEventListener('click',()=>{
    pokemonID--
    imagens.splice(0)
    index = 0
    mostrarPokemon(pokemonID)
    
})




