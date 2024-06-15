const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restartButton');

const cardsArray = [
    { name: 'apple', img: 'https://via.placeholder.com/80/FF0000/FFFFFF?text=A' },
    { name: 'banana', img: 'https://via.placeholder.com/80/FFFF00/000000?text=B' },
    { name: 'cherry', img: 'https://via.placeholder.com/80/FF00FF/FFFFFF?text=C' },
    { name: 'grape', img: 'https://via.placeholder.com/80/800080/FFFFFF?text=G' },
    { name: 'lemon', img: 'https://via.placeholder.com/80/FFFACD/000000?text=L' },
    { name: 'orange', img: 'https://via.placeholder.com/80/FFA500/FFFFFF?text=O' }
];

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

function initializeGame() {
    cards = [...cardsArray, ...cardsArray];
    cards.sort(() => 0.5 - Math.random());
    gameBoard.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'col-3');
        cardElement.dataset.name = card.name;
        cardElement.innerHTML = `<img src="${card.img}" alt="${card.name}">`;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matches = 0;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
    matches++;
    if (matches === cardsArray.length) {
        setTimeout(() => alert('You won!'), 500);
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

restartButton.addEventListener('click', initializeGame);

initializeGame();