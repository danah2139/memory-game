const startGameBtn = document.querySelector('button');
const seconds = document.querySelector('#seconds');
const minutes = document.querySelector('#minutes');
const hours = document.querySelector('#hours');
const intervalState = {
	countSec: 0,
	countMin: 0,
	countHr: 0,
};

let intervalID;
const state = {
	firstCard: '',
	secondCard: '',
	cardsCounter: 12,
	wrongGuessescounter: 0,
};
let wrongGuessescounterElement = document.querySelector('h2 > span');
let container = document.querySelector('.cards-container');
startGameBtn.addEventListener('click', () => {
	state.firstCard = '';
	state.secondCard = '';
	state.cardsCounter = 12;
	state.wrongGuessescounter = 0;
	intervalState.countSec = 0;
	intervalState.countMin = 0;
	intervalState.countHr = 0;
	wrongGuessescounterElement.textContent = `${state.wrongGuessescounter}`;
	clearInterval(intervalID);
	intervalID = setInterval(startClock, 1000);
	container.addEventListener('click', pickCard);
});

function startClock() {
	intervalState.countSec++;
	seconds.textContent = leftFillNum(intervalState.countSec, 2);
	if (intervalState.countSec === 59) {
		intervalState.countSec = 0;
		intervalState.countMin++;
		minutes.textContent = leftFillNum(intervalState.countMin, 2);
	}
	if (intervalState.countMin === 60) {
		intervalState.countMin = 0;
		intervalState.countHr++;
		intervalState.minutes.textContent = leftFillNum(intervalState.countMin, 2);
		hours.textContent = leftFillNum(intervalState.countHr, 2);
	}
}

function leftFillNum(num, targetLength) {
	return num.toString().padStart(targetLength, 0);
}

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
function pickCard(e) {
	if (state.firstCard === '') {
		state.firstCard = e.target.getAttribute('data');
		e.target.classList.remove('flliped');
		return;
	}
	container.removeEventListener('click', pickCard);
	state.secondCard = e.target.getAttribute('data');
	e.target.classList.remove('flliped');

	//console.log(state);
	setTimeout(() => {
		if (state.firstCard === state.secondCard) {
			state.cardsCounter -= 2;
			if (state.cardsCounter === 0) {
				alert('You Won!');
				return;
			}
		} else {
			let firstCardElememt = document.querySelector(
				`[data='${state.firstCard}']:not(.flliped)`
			);
			let secondCardElement = document.querySelector(
				`[data='${state.secondCard}']:not(.flliped)`
			);
			console.log(secondCardElement);
			firstCardElememt.classList.add('flliped');
			secondCardElement.classList.add('flliped');
			state.wrongGuessescounter++;
			wrongGuessescounterElement.textContent = `${state.wrongGuessescounter}`;
		}
		state.firstCard = '';
		state.secondCard = '';
		container.addEventListener('click', pickCard);
	}, 1000);
}

createCard();
