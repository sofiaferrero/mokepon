let mokepones = [];
let mokeponesEnemigos = []

let jugadorId = null
let enemigoId = null
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones
let inputHipoge
let inputCapipepo
let inputRatigueya
let inputLangostelvis
let inputTucapalma
let inputPydos
let botonFuego
let botonAgua
let botonTierra
let botones = []
let mascotaJugador
let mascotaJugadorObjeto
// let mascotaEnemigo
let ataquesMokepon
let ataquesMokeponEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3;
let vidasEnemigo = 3;

let lienzo = mapa.getContext("2d");
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './img/map.png'
const anchoMaximoDelMapa = 800
let anchoDelMapa = window.innerWidth-20
let alturaQueBuscamos
if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa-20
}
alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


// let mascotaEnemigoObjeto
// let movimientoEnemigo

class Moquepon {
    constructor (nombre, foto, vida, fotoMapa, id = null) {
        this.id = id;
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.ancho = 80;
        this.alto = 80;
        this.x = aleatoria(0, mapa.width - this.ancho);
        this.y = aleatoria(0, mapa.height - this.alto);
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }
    pintarMokepon () {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Moquepon ("Hipodoge", "./img/458.png", 5, "./img/458.png");
let capipepo = new Moquepon ("Capipepo", "./img/PGL-328.png", 5, "./img/PGL-328.png");
let ratigueya = new Moquepon ("Ratigueya", "./img/ac5307109ba5500c64612933e586e992.png", 5, "./img/ac5307109ba5500c64612933e586e992.png");
let langostelvis = new Moquepon ('Langostelvis', './img/255.png', 5, './img/255.png');
let tucalpalma = new Moquepon ('Tucapalma', './img/194-wooper.png', 5, './img/194-wooper.png');
let pydos = new Moquepon ('Pydos', './img/729849.png', 5, './img/729849.png');

const HIPODOGE_ATAQUES = [
    {nombre: '💧', id: 'button-water'},
    {nombre: '💧', id: 'button-water'},
    {nombre: '💧', id: 'button-water'},
    {nombre: '🔥', id: 'button-fire'},
    {nombre: '🌱', id: 'button-earth'},
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    {nombre: '🔥', id: 'button-fire'},
    {nombre: '🔥', id: 'button-fire'},
    {nombre: '🔥', id: 'button-fire'},
    {nombre: '🌱', id: 'button-earth'},
    {nombre: '💧', id: 'button-water'},
]
capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    {nombre: '🌱', id: 'button-earth'},
    {nombre: '🌱', id: 'button-earth'},
    {nombre: '🌱', id: 'button-earth'},
    {nombre: '💧', id: 'button-water'},
    {nombre: '🔥', id: 'button-fire'},
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

const LANGOSTELVIS_ATAQUES = [
    {nombre: '🌱', id: 'button-earth'},
    {nombre: '🌱', id: 'button-earth'},
    {nombre: '🔥', id: 'button-fire'},
    {nombre: '🔥', id: 'button-fire'},
    {nombre: '💧', id: 'button-water'},
]

langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES)

const TUCAPALMA_ATAQUES = [
    {nombre: '🌱', id: 'button-earth'},
    {nombre: '🌱', id: 'button-earth'},
    {nombre: '💧', id: 'button-water'},
    {nombre: '💧', id: 'button-water'},
    {nombre: '🔥', id: 'button-fire'},
]
tucalpalma.ataques.push(...TUCAPALMA_ATAQUES)

const PYDOS_ATAQUES = [
    {nombre: '🔥', id: 'button-fire'},
    {nombre: '🔥', id: 'button-fire'},
    {nombre: '🌱', id: 'button-earth'},
    {nombre: '🌱', id: 'button-earth'},
    {nombre: '💧', id: 'button-water'},
]

pydos.ataques.push(...PYDOS_ATAQUES)

mokepones.push(hipodoge,capipepo,ratigueya, langostelvis, tucalpalma, pydos);

//Funciones de juego

function iniciarJuego (){
    sectionAtaque.style.display = "none";
    sectionVerMapa.style.display = "none";

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <div class="card">
            <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <p>${mokepon.ataques[2].nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
        </div>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones;

        inputHipoge = document.getElementById("Hipodoge");
        inputCapipepo = document.getElementById("Capipepo");
        inputRatigueya = document.getElementById("Ratigueya");
        inputLangostelvis = document.getElementById("Langostelvis");
        inputTucapalma = document.getElementById("Tucapalma");
        inputPydos = document.getElementById("Pydos");
    })
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
    botonGame.addEventListener("click", reiniciarJuego);
    botonGame.style.display = "none";
    
    unirseAlJuego()
}

function unirseAlJuego (){
    fetch ("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok){
                res.text()
                    .then(function (respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador (){
    sectionAtaque.style.display = "none";
    sectionMascota.style.display = "none";
    sectionVerMapa.style.display = "flex";

    if (inputHipoge.checked){
        spanMascotaJugador.innerHTML = inputHipoge.id;
        mascotaJugador = inputHipoge.id;
    } else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id;
        mascotaJugador = inputCapipepo.id;
    } else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id;
        mascotaJugador = inputRatigueya.id;
    }  else if (inputLangostelvis.checked){
        spanMascotaJugador.innerHTML = inputLangostelvis.id;
        mascotaJugador = inputLangostelvis.id;
    }  else if (inputTucapalma.checked){
        spanMascotaJugador.innerHTML = inputTucapalma.id;
        mascotaJugador = inputTucapalma.id;
    }  else if (inputPydos.checked){
        spanMascotaJugador.innerHTML = inputPydos.id;
        mascotaJugador = inputPydos.id;
    } else {
        alert ("selecciona algo");
        reiniciarJuego()
    }
    seleccionarMokepon(mascotaJugador)
    extraerAtaques(mascotaJugador);
    iniciarMapa();
    // seleccionarMascotaEnemigo();
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques (mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++){
        if (mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
            <button id='${ataque.id}' class="boton-de-ataque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon;
    })
    botonFuego = document.getElementById("button-fire");
    botonAgua = document.getElementById("button-water");
    botonTierra = document.getElementById("button-earth");
    botones = document.querySelectorAll(".boton-de-ataque")
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === '🔥'){
                ataqueJugador.push("🔥");
                boton.style.background = 'var(--color3)';
                boton.disabled = true;
            } else if (e.target.textContent === '💧'){
                ataqueJugador.push('💧');
                boton.style.background = 'var(--color3)';
                boton.disabled = true;
            } else if (e.target.textContent === '🌱'){
                ataqueJugador.push('🌱');
                boton.style.background = 'var(--color3)';
                boton.disabled = true;
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques();
            }
        })
    })
}

function enviarAtaques() {
    fetch (`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques () {
    fetch (`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok){
                res.json()
                    .then (function ({ ataques }){
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function seleccionarMascotaEnemigo (enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueEnemigoAleatorio (){

    let ataqueAleatorio = aleatoria (0, ataquesMokeponEnemigo.length - 1);

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push('🔥')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('💧')
    } else {
        ataqueEnemigo.push('🌱')
    }

    iniciarPelea();
}

function iniciarPelea(){
    if(ataqueJugador.length === 5) {
        combate();
    }
}

function indexAmbosOponentes (jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate(){
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++){
        if (ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index, index);
            crearMensajesAtaque("EMPATE");
        } else if (ataqueJugador[index] === "🔥" && ataqueEnemigo[index] === "💧") {
            indexAmbosOponentes(index, index)
            crearMensajesAtaque("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        } else if (ataqueJugador[index] === "🌱" && ataqueEnemigo[index] === "🔥") {
            indexAmbosOponentes(index, index)
            crearMensajesAtaque("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        } else if (ataqueJugador[index] === "💧" && ataqueEnemigo[index] === "🌱") {
            indexAmbosOponentes(index, index)
            crearMensajesAtaque("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        } else {
            indexAmbosOponentes(index, index)
            crearMensajesAtaque("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }
    }
    revisarVictorias();
}

function revisarVictorias (){
    if (victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("Esto fue un empate")
    } else if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("GANASTE!!")
    } else {
        crearMensajeFinal("Perdiste...")
    }
}

function crearMensajesAtaque (resultado){

    let nuevoAtaqueJugador = document.createElement("p");
    let nuevoAtaqueEnemigo = document.createElement("p");

    sectionMensaje.innerHTML = resultado;
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo;

    sectionAtaqueJugador.appendChild(nuevoAtaqueJugador);
    sectionAtaqueEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function crearMensajeFinal (resultadoFinal){
    sectionMensaje.innerHTML = resultadoFinal;
    botonGame.style.display = "block";
}

function reiniciarJuego(){
    location.reload();
}

function aleatoria (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// function aleatoriaSinRepe (min, max, newArray){
//     let numAleatorio = aleatoria(min, max)
//     if(!newArray.includes(numAleatorio)) {
//         newArray.push(numAleatorio)
//         return numAleatorio
//     } else {
//         aleatoriaSinRepe()
//     }
// }

// canvas

function pintarCanvas (){

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    enviarPosition(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    mokeponesEnemigos.forEach(function (mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

function enviarPosition(x, y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/position`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
        .then (function (res) {
            if(res.ok) {
                res.json()
                    .then(function({ enemigos }){
                        mokeponesEnemigos = enemigos.map(function(enemigo){
                            let mokeponEnemigo = null
                            const mokeponNombre = enemigo.mokepon.nombre || ""
                            if(mokeponNombre === "Hipodoge") {
                                mokeponEnemigo = new Moquepon("Hipodoge", "./img/458.png", 5, "./img/458.png", enemigo.id)
                            } else if (mokeponNombre === "Capipepo") {
                                mokeponEnemigo = new Moquepon ("Capipepo", "./img/PGL-328.png", 5, "./img/PGL-328.png", enemigo.id)
                                } else if (mokeponNombre === "Ratigueya") {
                                    mokeponEnemigo = new Moquepon ("Ratigueya", "./img/ac5307109ba5500c64612933e586e992.png", 5, "./img/ac5307109ba5500c64612933e586e992.png", enemigo.id)
                                } else if (mokeponNombre === "Langostelvis") {
                                    mokeponEnemigo = new Moquepon ('Langostelvis', './img/255.png', 5, './img/255.png', enemigo.id)
                                } else if (mokeponNombre === "Tucapalma") {
                                    mokeponEnemigo = new Moquepon ('Tucapalma', './img/194-wooper.png', 5, './img/194-wooper.png', enemigo.id)
                                } else if (mokeponNombre === "Pydos") {
                                    mokeponEnemigo = new Moquepon ('Pydos', './img/729849.png', 5, './img/729849.png',  enemigo.id)
                                }
                                mokeponEnemigo.x = enemigo.x
                                mokeponEnemigo.y = enemigo.y
                                return mokeponEnemigo
                        })
                    })
            }
        })
}

//cuando la figura del enemigo se mueve la imagen se pone como en grande

// los movimientos con el teclado cuando no estoy en pantalla de compu me mueven toda la pantalla con scroll
// los botones funcionan cuando estoy probando responsive?

function moverDerecha () {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda () {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo () {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba () {
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento (){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function presionarTeclas (event) {
    switch (event.key){
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa (){
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    document.addEventListener("keydown", presionarTeclas);
    document.addEventListener("keyup", detenerMovimiento);
}

function obtenerObjetoMascota () {
    for (let i = 0; i < mokepones.length; i++){
        if (mascotaJugador === mokepones[i].nombre){
            return mokepones[i];
        }
    }
}

function revisarColision (enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    enemigoId = enemigo.id
    sectionAtaque.style.display = "block";
    sectionVerMapa.style.display = "none";
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener("load", iniciarJuego)