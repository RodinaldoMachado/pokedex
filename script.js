const divListaPokemon = document.querySelector('.lista-pokemon')
const btVerMais = document.querySelector('.ver-mais')
const btMostrarTodos = document.querySelector('.mostrar-todos')
const btBuscar = document.querySelector('.bt-busca')
const divResPesquisa = document.querySelector('.res-pesquisa')


var quant = 21
var pokemons = []

var pokemon = ''

var erroBuscaPokemon

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

var corFundo = ''
var corLetra = ''

async function buscaPokemon(num) {
    try {
        
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
        const data = await res.json();
        erroBuscaPokemon = ''
        return data;
        
    } catch (error) {
        erroBuscaPokemon = 'Pokemon não encontrando'
    }
}


async function montarLista(numInic,quantidade) {
    for (let i = numInic;  i < quantidade; i++) {
        let idPokemon = i + 1
        pokemons.push(await buscaPokemon(idPokemon))
        mostrarPokemon(i)

        
    }
}

var numero = 0

montarLista(numero,quant)


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

function  pegarTipos(i) {
    let tipo = []
    let divTipo = []

    for(let a =0; a < pokemons[i].types.length; a++){
         tipo.push(pokemons[i].types[a].type.name)
    }
    for (let a = 0; a < tipo.length; a++) {
        fundoPorTipo(tipo[a])

         divTipo[a] = `
                <div style="background:${corFundo};color:${corLetra}">
                    <p>${tipo[a]}</p>
                </div>
         `
         
        }
        

    return divTipo.join(' ')
}

function mostrarPokemonPesquisa(i) {
    if (erroBuscaPokemon == '') {
        let nomeLetraMaiuscula = pokemons[i].name[0].toUpperCase() + pokemons[i].name.substring(1)

        divResPesquisa.innerHTML += `
        <a  class="pokemon-single"  pokeid="${pokemons[i].id}"  href="page2.html">
        <img src="${pokemons[i].sprites.other['official-artwork'].front_default}" pokeid="${pokemons[i].id}" alt="">
        <p class="name-pokemon" pokeid="${pokemons[i].id}">${nomeLetraMaiuscula}</p>
        <p class="id-pokemon" pokeid="${pokemons[i].id}">Num: ${pokemons[i].id}</p>
        <div class="types">${pegarTipos(i)}</div>
        </a>
        `
        
    }else{
        divResPesquisa.innerHTML = erroBuscaPokemon
    }
}

function mostrarPokemon(i) {

    let nomeLetraMaiuscula = pokemons[i].name[0].toUpperCase() + pokemons[i].name.substring(1)
    
    divListaPokemon.innerHTML += `
    <a  class="pokemon-single"  pokeid="${pokemons[i].id}"  href="page2.html">
    <img src="${pokemons[i].sprites.other['official-artwork'].front_default}" pokeid="${pokemons[i].id}" alt="">
    <p class="name-pokemon" pokeid="${pokemons[i].id}">${nomeLetraMaiuscula}</p>
    <p class="id-pokemon" pokeid="${pokemons[i].id}">Num: ${pokemons[i].id}</p>
    <div class="types" pokeid="${pokemons[i].id}">${pegarTipos(i)}</div>
    </a>
    `
}

divListaPokemon.addEventListener('click',(t)=>{
    pokemon = t.target.getAttribute('pokeid')
    console.log(pokemon);
    let id = pokemon
    localStorage.setItem('pokemonID',id)
})

var idDoPokemon = ''



btVerMais.addEventListener('click',() => {
    let numeroInical = quant
    quant = quant + 9
    montarLista(numeroInical,quant)
})

function resetLista() {
    divListaPokemon.innerHTML = ''
    divResPesquisa.innerHTML = ''
    pokemons.splice(0)
    idDoPokemon = ''
}

btMostrarTodos.addEventListener('click',() => {
    btMostrarTodos.style.display = 'none'
    btVerMais.style.display = 'none'
    resetLista()
    totalPokemons = 1010
    montarLista(numero,totalPokemons)
})

btBuscar.addEventListener('click',async ()=>{

    let valor = document.querySelector('input[id=busca]').value
    document.querySelector('input[id=busca]').value = ''
    btMostrarTodos.style.display = 'block'
    let pok = await buscaPokemon(valor)
    resetLista()
    pokemons.push(pok)
    mostrarPokemonPesquisa(0)

})


divResPesquisa.addEventListener('click',(t)=>{
    pokemon = t.target.getAttribute('pokeid')
    localStorage.setItem('pokemonID',pokemon)
})
