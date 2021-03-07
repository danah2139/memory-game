const startGameBtn = document.querySelector('button');
const seconds = document.querySelector('#seconds');
const minutes = document.querySelector('#minutes');
const hours = document.querySelector('#hours');

let countSec = 0;
let countMin = 0;
let countHr = 0;

let intervalID;

startGameBtn.addEventListener('click', () => {
	intervalID = setInterval(startClock, 1000);
});

function startClock() {
	countSec++;
	seconds.textContent = leftFillNum(countSec, 2);
	if (countSec === 59) {
		countSec = 0;
		countMin++;
		minutes.textContent = leftFillNum(countMin, 2);
	}
	if (countMin === 60) {
		countMin = 0;
		countHr++;
		minutes.textContent = leftFillNum(countMin, 2);
		hours.textContent = leftFillNum(countHr, 2);
	}
}

function leftFillNum(num, targetLength) {
	return num.toString().padStart(targetLength, 0);
}

let container = document.querySelector('.cards-container');
let cardsCounter = 12;
let wrongGuessescounter = 0;
let firstCard = '';
let secondCard = '';
let wrongGuessescounterElement = document.querySelector('h2 > span');
wrongGuessescounterElement.textContent = `${wrongGuessescounter}`;
const createCard = () => {
	let cardIndexArr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
	for (let i = 0; i < 12; i++) {
		let card = document.createElement('div');
		card.classList.add('card');
		card.classList.add('flliped');
		let randomIndex = Math.floor(Math.random() * cardIndexArr.length);
		card.setAttribute('data', cardIndexArr[randomIndex]);
		cardIndexArr.splice(randomIndex, 1);
		container.appendChild(card);
	}
};

container.addEventListener('click', pickCard);
function pickCard(e) {
	if (firstCard === '') {
		firstCard = e.target.getAttribute('data');
		e.target.classList.remove('flliped');
	} else {
		secondCard = e.target.getAttribute('data');
		e.target.classList.remove('flliped');
		setTimeout(() => {
			container.removeEventListener('click', pickCard);
		}, 1000);
		if (firstCard === secondCard) {
			console.log('ok');
			cardsCounter -= 2;
			if (cardsCounter === 0) {
				window.prompt('You Win!');
				return;
			}
		} else {
			console.log(firstCard, secondCard);
			let firstCardElememt = document.querySelector(`[data='${firstCard}']`);
			let secondCardElement = document.querySelector(`[data='${secondCard}']`);
			firstCardElememt.classList.add('flliped');
			secondCardElement.classList.add('flliped');
			wrongGuessescounter++;
			wrongGuessescounterElement.textContent = `${wrongGuessescounter}`;
		}

		firstCard = '';
		secondCard = '';
	}
}

createCard();
