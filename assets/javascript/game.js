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
var guessesLeftCounter = 10;
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
  guessesLeftCounter = 10;
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

  guessesLeft.textContent = guessesLeftCounter;
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
        document.getElementById("yodaAudio").play(); // Location t
      }
    }

    placeholders.textContent = pickedWordPlaceholderArr.join('');
    checkIncorrect(letter);

    setTimeout(function(){
      if (pickedWordPlaceholderArr.join('') === pickedCharacterName) {
        winsCount++;
        gameRunning = false;
        winsHtml.textContent = winsCount;
        console.log(winsCount)
        document.getElementById("yodaAudio").pause();
        document.getElementById("wellTrainedAudio").play();
        alert("You Win!")
        document.getElementById("wellTrainedAudio").pause();
        newGame()
      }

      if(guessesLeftCounter === 1) {
        lossesCount++;
        gameRunning = false;
        lossesHtml.textContent = lossesCount;
        console.log(lossesCount)
        document.getElementById("yodaAudio").pause();
        document.getElementById("blasterAudio").play();
        alert("You Lost!")
        document.getElementById("blasterAudio").pause();
        newGame()
      }
    }, 200)


  } else {
    if (!gameRunning) {
      alert("click new game");
    } else {
      alert("you've already guessed this letter");
    }
  }
}



//incorrect letter
function checkIncorrect(letter) {
  //checks if letter is in wordplaceholderarr both capital and lowercase letters
  if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 &&
    pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) {
    //decreases guesses counter
    guessesLeftCounter--;
    //adds the incorrect letter to bank
    incorrectLetterBank.push(letter);
    guessedLetters.textContent = incorrectLetterBank.join(' ');
    //writes how many guesses left to dom
    document.getElementById("dontDoAudio").play();
    guessesLeft.textContent = guessesLeftCounter;
  }

}


//new game button event listener...
newGameButton.addEventListener('click', newGame);

document.onkeyup = function(event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    letterGuess(event.key);
  } else if (event.keyCode === 109 || event.keyCode === 189){
    letterGuess(event.key);
  }

  // {
  //   window.addEventListener("click", function() {
  //     document.getElementById("themesong").play();
  //   });
  //   window.addEventListener("keyup", function() {
  //     document.getElementById("themesong").pause()
  //   })
  // }
}
