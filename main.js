lives = 60;
class memoryGame {
    constructor(gametime, cards) {
        this.cardsArr = cards;
        this.gametime = gametime;
        this.ticker = document.getElementById('flips');
        this.timeRemaining = gametime;
        this.timer = document.getElementById('time-remaining')
        this.liveWrap = document.getElementById('lives')
    }

    startGame() {
        this.liveWrap.innerText = `You have ${lives} lives left!`
        this.tries = 0;
        this.timeRemaining = this.gametime;
        this.checkCard = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.shuffleCards(this.cardsArr);
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 300)
        this.hideCards();
        this.ticker.innerText = this.tries;
        this.timer.innerText = this.timeRemaining;
        
    }


    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameover();
        }, 1000);
    }

    hideCards() {
        this.cardsArr.forEach(card => {
            card.classList.remove('visible');
        });
    }


    victory() {
        clearInterval(this.countdown);
        document.getElementById('victorytext').classList.add('visible');
    }
    
    gameover() {
        clearInterval(this.countdown);
        document.getElementById('gameovertext').classList.add('visible');
    }

    
    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.tries++;
            this.ticker.innerText = this.tries;

            if(this.tries === 0) {
                this.gameover()
            }
            card.classList.add('visible');

            if(this.checkCard) {
                this.checkCardMatch(card);
            } else {
                this.checkCard = card;
            }
        }
    }
    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.checkCard;
    }


    checkCardMatch(card) {
        if(this.cardType(card) === this.cardType(this.checkCard))
            this.cardMatch(card, this.checkCard);
        else 
            this.cardMismatch(card, this.checkCard);
            lives-= 1
            if (lives == 0) {
                console.log("You lost")
            } else {
            this.liveWrap.innerText = `You have ${lives} lives left!`
            }
        this.checkCard = null;
    }
    cardType(card) {
        return card.getElementsByClassName('value')[0].src;
    }


    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        
        if(this.matchedCards.length === this.cardsArr.length)
            this.victory();
    }


    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
            // this.tries--;
        }, 1000);

        
    }
    shuffleCards(cardsArr) { 
        for (let i = cardsArr.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            cardsArr[randIndex].style.order = i;
            cardsArr[i].style.order = randIndex;
        }
    }
    
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new memoryGame(100, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}
