let container = document.querySelector('.cards-container');
const createCard = () => {
	let cardIndexArr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
	for (let i = 0; i < 12; i++) {
		let card = document.createElement('div');
		card.classList.add('card');
		let randomIndex = Math.floor(Math.random() * cardIndexArr.length);
		card.setAttribute('data', cardIndexArr[randomIndex]);
		cardIndexArr.splice(randomIndex, 1);
		container.appendChild(card);
	}
};

createCard();
