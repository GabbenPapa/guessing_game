'use strict';

let maxScore = 20;
document.querySelector('.score').textContent = maxScore;
const chkBtn = document.querySelector('.check')

let secretNumber = Math.trunc(Math.random() * 20) + 1;
//document.querySelector('.number').textContent = secretNumber;
let highScore = 0;

const guessInput = document.querySelector('.guess');
guessInput.addEventListener("input", (event) =>
	guessInput.value = (+guessInput.value) < 1
		? ""
		: +guessInput.value > 20
			? 20
			: +guessInput.value
)

const startCeck = () => {
	const guess = Number(guessInput.value);

	console.log(guess);
	if (!guess) {
		setMessage('No number');
		return false;
	}
	else if (guess === secretNumber) {
		setMessage('Correct Number');
		document.querySelector('body').style.backgroundColor = '#60b347';
		document.querySelector('.number').style.width = '30rem';
		chkBtn.setAttribute('disabled', true);
		openModal();

		if (maxScore > highScore) {
			highScore = maxScore;
			document.querySelector('.highscore').textContent = highScore;
		}
	}
	else if (guess !== secretNumber) {
		if (maxScore > 1) {
			setMessage(guess > secretNumber ? 'Too High' : 'Too Low');
			maxScore--;
		}
		else {
			setMessage('You Loooose');
			maxScore = 0;
		}
	}

	document.querySelector('.score').textContent = maxScore;
}

chkBtn.addEventListener('click', startCeck);

window.addEventListener("keydown", (event) => {
	console.log(event);
	if (event.key === "Enter") {
		startCeck()
	}
	if (event.key === "Escape" && !modalWindow.classList.contains('hidden')) {
		closeModal();
	}
});

const againBtn = document.querySelector('.again');

const setMessage = (param) => {
	document.querySelector('.message').textContent = param;
}

againBtn.addEventListener('click', (event) => {
	guessInput.value = "";
	setMessage('Start guessing...')
	document.querySelector('.score').textContent = 20;
	highScore = 20;
	document.querySelector('body').style.backgroundColor = '#222';
	closeModal();
});

const modalWindow = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCoseModal = document.querySelector('.close-modal');

const openModal = function () {
	modalWindow.classList.remove('hidden');
	overlay.classList.remove('hidden');
}

const closeModal = function () {
	modalWindow.classList.add('hidden');
	overlay.classList.add('hidden');
}

btnCoseModal.addEventListener('click', () => {
	closeModal();
})