const emojis = ["🐎","🐎","🐈","🐈","🐕","🐕","🐘","🐘","🐨","🐨","🦢","🦢","🦈","🦈","🦦","🦦"];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let shuffledEmojis = shuffle(emojis);
let flippedCards = [];
let disableClick = false;

for (let i = 0; i < shuffledEmojis  .length; i++) {
    let card = document.createElement('div');
    card.className = 'item';
    card.dataset.emoji = shuffledEmojis[i];
    card.innerHTML = "";

    card.onclick = function () {
        if (disableClick || this.classList.contains('turnCard')) return;

        this.classList.add('turnCard')
        this.innerHTML = this.dataset.emoji;
        
        flippedCards.push(this);

        if (flippedCards.length == 2) {
            checkForMatch();
        }
    };

    document.getElementById('game').appendChild(card);
}

function checkForMatch() {
    disableClick = true;

    let [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        flippedCards = [];
        disableClick = false;
    } else {
        setTimeout(() => {
            firstCard.classList.remove('turnCard');
            firstCard.innerHTML = "";

            secondCard.classList.remove('turnCard');
            secondCard.innerHTML = "";

            flippedCards = [];
            disableClick = false;
        }, 800);
    }
}

function reset() {
    window.location.reload();
}