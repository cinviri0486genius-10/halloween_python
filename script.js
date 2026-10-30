// Definición de las parejas: cada par comparte el mismo 'id'
const cardsData = [
    { id: 1, text: "print()", type: "concept", icon: "🔮" },
    { id: 1, text: "Muestra un hechizo en pantalla", type: "match", icon: "🔮" },
    
    { id: 2, text: "Variables", type: "concept", icon: "⚗️" },
    { id: 2, text: "Frascos para guardar pociones", type: "match", icon: "⚗️" },
    
    { id: 3, text: "for loop", type: "concept", icon: "🔄" },
    { id: 3, text: "Repite un susto varias veces", type: "match", icon: "🔄" },
    
    { id: 4, text: "if / else", type: "concept", icon: "🔀" },
    { id: 4, text: "Elige entre dulce o truco", type: "match", icon: "🔀" },
    
    { id: 5, text: "Listas [ ]", type: "concept", icon: "📜" },
    { id: 5, text: "Un pergamino con ingredientes", type: "match", icon: "📜" },
    
    { id: 6, text: "Diccionarios { }", type: "concept", icon: "📖" },
    { id: 6, text: "Libro de claves y maldiciones", type: "match", icon: "📖" },
    
    { id: 7, text: "def", type: "concept", icon: "🧙‍♀️" },
    { id: 7, text: "Invoca una función mágica", type: "match", icon: "🧙‍♀️" },
    
    { id: 8, text: "Bugs", type: "concept", icon: "🕷️" },
    { id: 8, text: "Cucarachas que rompen tu código", type: "match", icon: "🕷️" }
];

let flippedCards = [];
let moves = 0;
let matches = 0;
let lockBoard = false;

const grid = document.getElementById("grid");
const movesDisplay = document.getElementById("moves");
const matchesDisplay = document.getElementById("matches");
const restartBtn = document.getElementById("restart-btn");

// Función para barajar (Algoritmo Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Crea el tablero de juego
function createBoard() {
    grid.innerHTML = "";
    const shuffledCards = shuffle([...cardsData]);
    
    shuffledCards.forEach(data => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = data.id;
        
        card.innerHTML = `
            <div class="card-face card-back"></div>
            <div class="card-face card-front">
                <span class="icon">${data.icon}</span>
                <span>${data.text}</span>
            </div>
        `;
        
        card.addEventListener("click", flipCard);
        grid.appendChild(card);
    });
}

// Maneja el volteo de las cartas
function flipCard() {
    if (lockBoard) return;
    if (this === flippedCards[0]) return; // Evita hacer doble click en la misma carta

    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        updateMoves();
        checkForMatch();
    }
}

// Verifica si las dos cartas volteadas son iguales
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.id === card2.dataset.id;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

// Si coinciden, se quedan fijas
function disableCards() {
    flippedCards[0].removeEventListener("click", flipCard);
    flippedCards[1].removeEventListener("click", flipCard);
    
    matches++;
    matchesDisplay.textContent = matches;
    
    resetTurn();
    
    if (matches === cardsData.length / 2) {
        setTimeout(() => alert("¡Felicidades, maestro de la magia! Has dominado Python esta noche. 🎃🐍"), 500);
    }
}

// Si no coinciden, se vuelven a ocultar
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        flippedCards[0].classList.remove("flipped");
        flippedCards[1].classList.remove("flipped");
        resetTurn();
    }, 1200); // Tiempo para que el jugador memorice
}

function resetTurn() {
    flippedCards = [];
    lockBoard = false;
}

function updateMoves() {
    moves++;
    movesDisplay.textContent = moves;
}

// Reiniciar el juego por completo
function resetGame() {
    moves = 0;
    matches = 0;
    movesDisplay.textContent = moves;
    matchesDisplay.textContent = matches;
    flippedCards = [];
    lockBoard = false;
    createBoard();
}

restartBtn.addEventListener("click", resetGame);

// Inicializar al cargar la página
createBoard();
