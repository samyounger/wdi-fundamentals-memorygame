var cards = ['queen', 'queen', 'king', 'king'];
var newCards = [];

var cardInPlay = [];

//********************************************************************
//set the board with 4 cards

var gameBoard = document.getElementById('game-board');
var createBoard = function() {
	for (var i = 0; i < cards.length + newCards.length; i += 1){
		//create a card div element
		var newCard = document.createElement('div');
		//give the newly created card div element a class of 'card'
		newCard.className = 'card';
		//move the newly created card into the game-board div
		gameBoard.appendChild(newCard);
//random card generator so the board's layout is unpredictable
		//pick a card at random
		var usedCard = cards[Math.floor(Math.random() * cards.length)];
		//save that card to the new array newCards
		newCards.push(usedCard);
		//find the index of the Random card in the cards array and save as var cardNo
		var cardNo = cards.indexOf(usedCard);
		//remove the Randomly selected card from the cards array
		cards.splice(cardNo, 1);
		//set a player-card identity to each card from the cards array
		newCard.setAttribute('data-card', newCards[i]);
	}
};

//run the createBoard function to set the board
createBoard();

//a listener for when a card is clicked
var cardSelected = document.getElementsByClassName('card');

var clickListen = function() {
	for (var i = 0; i < newCards.length; i += 1) {
		cardSelected[i].onclick = function() {
		//test if the card has been clicked already, if so exit the loop
		if(this.getAttribute('class') === 'card selected') {
				return
			} else {
			//give the card a new attribute called data-card
			cardInPlay.push(this.getAttribute('data-card'));
			//change the class name to 'card selected' to pull in the style 'selected' & remove the background
			this.className = 'card selected';
			//if the card is selected, reveal an image of the card
			if (this.getAttribute('data-card') === 'king') {
				this.innerHTML = '<img src="images/blackKing.png" alt="King of Spades"/>';
			} else {
				this.innerHTML = '<img src="images/redQueen.png" alt="Queen of Diamonds"/>';
			}
			//run the funciton isTwoCards
			isTwoCards();
			}
		}
	}
};
clickListen();

//function tests if there are two cards in play before checking if there is a match
var isTwoCards = function() {
	if (cardInPlay.length === 2) {
		isMatch(cardInPlay);
	    cardInPlay = [];
	}
};

//function tests if two cards selected match
var isMatch = function(card) {
	if( cardInPlay[0] === cardInPlay[1]) {
		var winLose = document.createElement('div');
		winLose.id = 'winlose';
		gameBoard.appendChild(winLose);
		winLose.textContent = "You Win";

			// setTimeout(function() {
			// 	$('winlose').load('index.html',function(){
   //  				$('body').fireworks();
			// 	});
			// });

			function fireworksOn() {
				$('body').fireworks();
			}
			fireworksOn();

	} else {
		var winLose = document.createElement('div');
		winLose.id = 'winlose';
		gameBoard.appendChild(winLose);
		winLose.textContent = 'Try Again';
	}

	//clear the deck to try again or when won
	//a delayed function to enable the cards to spin to 'prettify'
	var timeoutID;
		function delayedAlert() {
		timeoutID = window.setTimeout(slowClear, 2000);
	}
	delayedAlert();
	function slowClear() {
		for (var i = 0; i < newCards.length; i += 1) {
			cardSelected[i].innerHTML = "";
			cardSelected[i].className = 'card';
			if(i === 0) {
				var message = document.getElementById('winlose');
				//if the game is won, reset the board
				if(message.textContent === "You Win") {
					resetBoard();
				}
				message.parentNode.removeChild(message);

				function fireworksOff() {
					$('body').fireworks('destroy');
				}
				fireworksOff();
			}
		}
	}
};

//once the game is won, reset the board so the cards are shuffled again
var resetBoard = function() {
	var allCards = document.getElementsByClassName('card');
	for (var i = newCards.length-1; i >= 0; i -= 1) {
		allCards[i].parentNode.removeChild(allCards[i]);
	}
	cards = ['queen', 'queen', 'king', 'king'];
	newCards = [];
	createBoard();
	clickListen();
}