document.addEventListener("DOMContentLoaded", () => {
    
    const startMenu = document.createElement("div")
    startMenu.id = "start-menu"
    startMenu.innerHTML = 
    `<div class="menu">
            <h1>MEMOJOJORY</h1>
            <label for="difficulty">Dificultad:</label>
    <select id="difficulty">
        <option value="normal">Normal (20 intentos)</option>
        <option value="dificil">Dificil (12 intentos)</option>
    </select>
    <button id="start-button">Iniciar Juego</button>
</div>
        </div>`
    document.body.appendChild(startMenu) //Crea el menu y lo añade al body
    

    document.getElementById("start-button").addEventListener("click", () => {
        let difficulty = document.getElementById("difficulty").value

        if (difficulty === "dificil") {
            maxAttempts = 12 // Modo difícil
        } else {
            maxAttempts = 20 // Normal
        }
        console.log("Intentos maximos actualizados a:", maxAttempts)
        setTimeout(() => {
            document.getElementById("max-attempts").innerHTML = maxAttempts
        }, 500)
    document.getElementById("current-attempts").innerHTML = "0"
    document.getElementById("stats").classList.add("show")// Muestra intentos

        document.getElementById("start-menu").style.display = "none" // Oculta el menú
        document.getElementById("game").style.visibility = "visible" // Muestra el juego
        document.getElementById("game").style.opacity = "1" // Suaviza la transición
        
        startGame()
    })
})

window.onload = function() {
    menumusic.play()
}

const totalCards = 20 //Cartas en pantalla
let menumusic = document.getElementById(`menumusic`)
let flipSound = document.getElementById(`flip`)
let winSound = document.getElementById(`win`)
let loseSound = document.getElementById(`lose`)
let music = document.getElementById(`music`)
let maxAttempts = 20 
//let cards = [] //Cartas generadas
//let selectedCards = [] //Cartas seleccionadas
//let valuesUsed = [] //Controla cuantas veces se ha usado un valores
//let move = 0 // Movimiento actual
//let attempts = 0


/* let model = `<div class="card"><div class="back"></div><div class="face"></div></div>` // Modelo de carta
 */
    

    let playButton = document.getElementById('playButton')
    let pauseButton = document.getElementById('pauseButton')
      
    playButton.addEventListener('click', function() {
        music.play()
        console.log('Música Reproducida')
    })
    
    pauseButton.addEventListener('click', function() {
        music.pause()
        console.log('Música Pausada')
    })



function startGame() {
    // Reiniciar variables
    attempts = 0
    move = 0
    selectedCards = []
    valuesUsed = []
    // Actualizar el contador de intentos en la interfaz
    document.querySelector("#stats").innerHTML = "0 Intentos"

    // Limpia la pantalla
    document.getElementById("game").innerHTML = ""

    music.play()
    
    let model = `<div class="card"><div class="back"></div><div class="face"></div></div>`
    for (let i = 0; i < totalCards; i++) {
        let div = document.createElement("div")
        div.innerHTML = model
        document.getElementById("game").appendChild(div)
        randomValue()
        div.querySelector(".face").innerHTML = getImage(valuesUsed[i]) // Asigna imagen a la carta
        div.querySelector(".card").addEventListener("click", activate) // Permite voltear las cartas
    }
} //Genera cartas usando un modelo y les asigna una imagen aleatoria y flipearlas


function activate(event) {
if(move < 2) { //Limita a 2 las cartas por turno
   
    if ((!selectedCards[0] || selectedCards[0] !== event.target) && !event.target.classList.contains(`active`)) {
        event.target.classList.add(`active`) //Le damos la clase activa a la carta seleccionada, y prevenimos que le de la vuelta a una carta ya activa
        selectedCards.push(event.target) //Si selectedCards está vacío o es diferente de la primera carta lo añadimos al array
        flipSound.play()
        if (++move == 2) //aumentamos move y comprobamos si ya se seleccionaron 2 cartas 
        {
            
        attempts++
        checkLose() // Verifica si el jugador ha superado los intentos
        document.querySelector(`#stats`).innerHTML = attempts + `/` + maxAttempts + ` Intentos`//Avanza el contador al darle la vuelta a 2 cartas y lo reescribe
            if (selectedCards[0].querySelectorAll(`.face`)[0].innerHTML == selectedCards[1].querySelectorAll(`.face`)[0].innerHTML) // Comprueba que las 2 cartas son iguales
               {
                selectedCards = []
                move = 0
                checkWin() // Verifica si todas las cartas están activas
            } // Reiniciamos las cartas seleccionadas y el contador de movimientos para seguir jugando

            else {
                setTimeout(() => {
                    selectedCards[0].classList.remove(`active`)
                    selectedCards[1].classList.remove(`active`)
                    selectedCards = []
                    move = 0
                }, 1000) // Si no son iguales les damos la vuelta y reseteamos para que continúe el juego
            }
        }
    }
} //Activa y compara las 2 cartas para ver si son iguales o no

} 

function randomValue() {
    let rng = Math.floor(Math.random() * totalCards * 0.5) //Generamos números igual a la mitad de las cartas
    let values = valuesUsed.filter(value => value === rng) // Filtramos para saber cuantas veces se ha generado un número que está en ValuesUsed.
    if (values.length < 2) {
        valuesUsed.push(rng)
    } // Si el número generado aparece menos de 2 veces lo añade a valuesUsed
    else {
        randomValue() //Si ese número ya aparece 2 veces se repite la función para crear otro
    }

}// Genera valores aleatorios para las cartas y evita que aparezcan ás de 2 cartas iguales



function getImage(imageid){
    return `<img alt="img ${imageid}" src="images/${imageid}.jpg"></img>`

} //Selector de imágenes

/* cardsContainer.innerHTML = getImage([i]) */



function restartGame() {
    document.getElementById("game").innerHTML = "" // Borra las cartas
    attempts = 0
    move = 0
    selectedCards = []
    valuesUsed = []
    document.querySelector("#stats").innerHTML = "0 Intentos" // Reinicia el contador de intentos
    startGame() // Inicia el juego otra vez
} //reinicia la partida


function checkWin() {
    let allMatched = document.querySelectorAll(".card.active").length === totalCards
    if (allMatched) {
        winSound.play()
        setTimeout(() => {
            alert(`Felicidades! Has ganado el juego `)
            restartGame()
        }, 500)
    }
} //Comprueba que ganas



function checkLose() {
    if (attempts >= maxAttempts) {
        setTimeout(() => {
            loseSound.play()
            alert("Perdiste! Superaste el limite de intentos ")
            restartGame()
        }, 500)
    }
} //comprueba que pierdes









/*for (let i = 0; i < totalCards; i++) {
    let div = document.createElement(`div`)
    div.innerHTML = model
    cards.push(div)
    document.querySelector(`#game`).appendChild(cards[i]) // Añadimos la carta creada como un hijo de game      
    randomValue() 
   /*  cards[i].querySelectorAll(`.face`)[0].innerHTML = valuesUsed[i] */ //Asignamos un valor a la carta
    //cards[i].querySelectorAll(`.face`)[0].innerHTML = getImage(valuesUsed[i]) //asignamos una imagen a la carta
    //cards[i].querySelectorAll(`.card`)[0].addEventListener(`click`, activate) // Cuando haga click en la carta se dará la vuelta
    
 // Generador de cartas usando el modelo, que aplica un valor usando la fórmula random value y que permite dar la vuelta a las cartas clicando

