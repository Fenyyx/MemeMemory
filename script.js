
const totalCards = 24 //Cartas en pantalla
let cards = [] //Cartas generadas
let selectedCards = [] //Cartas seleccionadas
let valuesUsed = [] //Controla cuantas veces se ha usado un valores
let move = 0 // Movimiento actual
let attempts = 0


let model = `<div class="card"><div class="back"></div><div class="face"></div></div>` // Modelo de carta



function activate(event) {
if(move < 2) { //Limita a 2 las cartas por turno
   event.target.classList.add(`active`) //Le damos la clase activa a la carta seleccionada
    if ((!selectedCards[0] || selectedCards[0] !== event.target) && !event.target.classList.contains(`active`)) {
        event.target.classList.add(`active`) //Le damos la clase activa a la carta seleccionada, y prevenimos que le de la vuelta a una carta ya activa
        selectedCards.push(event.target) //Si selectedCards está vacío o es diferente de la primera carta lo añadimos al array

        if (++move == 2) //aumentamos move y comprobamos si ya se seleccionaron 2 cartas 
        {
            
        attempts++
        document.querySelector(`#stats`).innerHTML = attempts + ` ` + `intentos`//Avanza el contador al darle la vuelta a 2 cartas
            if (selectedCards[0].querySelectorAll(`.face`)[0].innerHTML == selectedCards[1].querySelectorAll(`.face`)[0].innerHTML) // Comprueba que las 2 ccartas son iguales
               {
                selectedCards = []
                move = 0
            } // Reiniciaos las cartas seleccionadas y el contador de movimientos para seguir jugando
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

for (let i = 0; i < totalCards; i++) {
    let div = document.createElement(`div`)
    div.innerHTML = model
    cards.push(div)
    document.querySelector(`#game`).appendChild(cards[i]) // Añadimos la carta creada como un hijo de game
    randomValue() 
    cards[i].querySelectorAll(`.face`)[0].innerHTML = valuesUsed[i] //Asignamos un valor a la carta
    cards[i].querySelectorAll(`.card`)[0].addEventListener(`click`, activate) // Cuando haga click en la carta se dará la vuelta
} // Generador de cartas usando el modelo, que aplica un valor usando la fórmula random value y que permite dar la vuelta a las cartas clicando

 