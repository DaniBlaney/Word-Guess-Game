//alert(May the Force be with You!);
// DOM elements
var newGameButton = document.getElementById('new-game-button');
var placeholders = document.getElementById('placeholders');
var guessedLetters = document.getElementById('guessed-letters');
var guessesLeft = document.getElementById('guesses-left');
var wins = document.getElementById('wins');
var losses = document.getElementById('losses');


//Create variables (words, wins, losses, incorrect letters)
var characterNameBank = ["Darth Vader", "Princess Leia", "Luke Skywalker", "Obi-Wan Kenobi", "Han Solo", "Chewbacca", "R2-D2", "C-3PO", "Greedo", "Boba Fett", "Jabba the Hutt", "Jar Jar Binks", "Yoda"];
var guessesLeft = 25;
var pickedCharacterName = '';
var gameRunning = false;
var wins = 0;
var losses = 0;
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];

//Create new game function picks names at random
function newGame() {
  //resetting all the game info
  gameRunning = true;
  guessesLeft = 25;
  guessedLetterBank = [];
  incorrectLetterBank = [];
  pickedWordPlaceholderArr = [];


//picking a word
pickedCharacterName = characterNameBank[Math.floor(Math.random() * characterNameBank.length)];

for (var i = 0; i < pickedCharacterName.length; i++) {
  if (pickedCharacterName[i] === ' ') {
    pickedWordPlaceholderArr.push(' ');
  } else {
    pickedWordPlaceholderArr.push('_');
  }
}

guessesLeft.textContent = guessesLeft;
placeholders.textContent = pickedWordPlaceholderArr.join('');
guessedLetters.textContent = incorrectLetterBank;

}


// letterguess function, letter pressed and returns letter in incorrect or correct on keyup
function letterGuess(letter) {
  console.log(letter);

  if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
    guessedLetterBank.push(letter);

    for var i = 0; i < pickedCharacterName.length; i++) {
      if (pickedCharacterName[i].toLowerCase() === letter.toLowerCase()) {
        pickedWordPlaceholderArr[i] = pickedCharacterName[i];
      }
    }

  placeholders.textContent = pickedWordPlaceholderArr.join('');

  }
  else {
    if (!gameRunning){
      alert("click new game");
      else {
        alert("you've already guessed this letter");
      }
    }
  }


//check losses

//check wins

//incorrect letter
function checkIncorrect(letter) {
  if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 &&
  pickedWordPlaceholderArr.indexOf(letter.toUppercase()) === -1)
  {
    //decreases guesses
    guessesLeft==;
    //adds the incorrect letter to bank
    incorrectLetterBank.push(letter);
    guessedLetters.textContent = incorrectLetterBank.join(' ');
    //writes how many guesses left to dom
    guessesLeft.textContent = guessesLeft;
  }
}


//new game button event listener...WHY WONT THIS WORKKKKKKK
newGameButton.addEventListener('click', newGame);

document.onkeyup = function(event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    letterGuess(event.key);
  }
}
