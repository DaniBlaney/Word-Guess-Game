//alert(May the Force be with You!);
// DOM elements
var newGameButton = document.getElementById('new-game-button');
var placeholders = document.getElementById('placeholders');
var guessedLetters = document.getElementById('guessed-letters');
var guessesLeft = document.getElementById('guesses-left');
var winsHtml = document.getElementById('wins');
var lossesHtml = document.getElementById('losses');
var themesong = document.getElementById('themesong');

//Create variables (words, wins, losses, incorrect letters)
var characterNameBank = ["Darth Vader", "Princess Leia", "Luke Skywalker", "Obi-Wan Kenobi", "Han Solo", "Chewbacca", "Greedo", "Boba Fett", "Jabba the Hutt", "Jar Jar Binks", "Yoda"];
var guessesLeft = 25;
var pickedCharacterName = '';
var gameRunning = false;
var winsCount = 0;
var lossesCount = 0;
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


// letter guess function, letter pressed and returns letter in incorrect or correct on keyup
function letterGuess(letter) {
  console.log(letter);

  if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
    guessedLetterBank.push(letter);
//checks if letter is in my character name
    for (var i = 0; i < pickedCharacterName.length; i++) {
      if (pickedCharacterName[i].toLowerCase() === letter.toLowerCase()) {
        pickedWordPlaceholderArr[i] = pickedCharacterName[i];
      }
    }

  placeholders.textContent = pickedWordPlaceholderArr.join('');
  checkIncorrect(letter);

  }
  else {
    if (!gameRunning){
      alert("click new game");
    } else {
        alert("you've already guessed this letter");
      }
    }

  }


//check losses..
function checkLoss() {
  if (guessesLeft === 0){
    lossesCount++;
    gameRunning = false;
    lossesHtml.textContent = lossesCount;
    placeholders.textContent = pickedCharacterName
  }
  //if(lossesCount){// Your condition <can't make this work>
    //document.getElementById("yodaAudio").play(); // Location t
}
checkWin();
//check wins
function checkWin() {
  if (pickedCharacterName.toLowerCase()=== pickedWordPlaceholderArr.join('').toLowerCase)
{
  winsCount++;
  gameRunning = false;
  winsHtml.textContent = winsCount;
}
//if(winsCount){// Your condition <can't make this work>
  //document.getElementById("blasterAudio").play(); // Location t

}

//incorrect letter
function checkIncorrect(letter) {
  //checks if letter is in wordplaceholderarr both capital and lowercase letters
  if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 &&
  pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1)
  {
    //decreases guesses counter
    guessesLeft --;
    //adds the incorrect letter to bank
    incorrectLetterBank.push(letter);
    guessedLetters.textContent = incorrectLetterBank.join(' ');
    //writes how many guesses left to dom
    guessesLeft.textContent = guessesLeft;
  }

  //play sound when letters are guessed

if(guessedLetterBank){// Your condition
  document.getElementById("yodaAudio").play(); // Location to your sound file
}

if(incorrectLetterBank){// Your condition
  document.getElementById("dontDoAudio").play(); // Location to your sound file
}

}

checkLoss();

//new game button event listener...
newGameButton.addEventListener('click', newGame);

document.onkeyup = function(event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    letterGuess(event.key);
  }
}

{ window.addEventListener("click", function () { document.getElementById("themesong").play();});
  window.addEventListener("keyup", function(){ document.getElementById("themesong").pause()})
  }
