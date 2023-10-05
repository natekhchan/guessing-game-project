/** Guessing Game Project
 * Institution: App Academy Online
 * Project link: https://my.appacademy.io/lessons/user-input/0e404b7c/practices/guessing-game-project/d236f9b6
 * Author: Nathan Chan
 * Date: October 5, 2023
 */


// Require the 'readline' module to handle user input.

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// init GLOBAL variables

let secretNumber; // The secret number for the guessing game.
let numAttempts; // The number of attempts left for the guessing game.

// Generates a random integer within the range inclusive.  

const randomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Checks if the value is a valid number and not other types or NaN.

function isValidValue(value) {
    return typeof value === 'number' && !isNaN(value);
}

// built-in function to check if the guess is correct

const checkGuess = (guess) => {
    if (isValidValue(guess)) {
        if (guess > secretNumber) {
            console.log('Too high.');
              return false;
          } else if (guess < secretNumber) {
            console.log('Too low.');
              return false;
          } else {
            console.log('Correct!');
            return true;
      }
     } else {
        console.log('Invalid input. Please enter a valid number.'); // returns invalid input if it is not a number.
        return false;
    }
};

 // Asks the user for their guess until the number is right.
 
const askGuess = () => {
  rl.question('Enter a guess: ', (userInput) => {
    const userGuess = Number(userInput);
    const isCorrect = checkGuess(userGuess);

    numAttempts--;

    if (isCorrect) {
      console.log('You win!'); // Message appears if the guess is right.
      rl.close();
    } else if (numAttempts <= 0) {
      console.log('You Lose.');
      rl.close(); // Close the input interface when the guess is correct.
    } else {
      console.log(`Attempts left: ${numAttempts}`); // The number of attempts left in the guessing game.
      askGuess();
    }
  });
};

// Asks the user for the range of the min, max numbers.

const askRange = () => {
  rl.question('Enter a min number: ', (minInput) => {    // enter a min number
    const min = Number(minInput);

    rl.question('Enter a max number: ', (maxInput) => {   // enter a max number
      const max = Number(maxInput);
      console.log(`I'm thinking of a number between ${min} and ${max}...`);
      
      secretNumber = randomInRange(min, max);
      console.log(`Secret number chosen. Let's play!`); // secret number chosen by CPU
      
      askGuess(); // jumps to the askGuess function.
    });
  });
};

// Asks the number of attempts for the game.

const askLimit = () => {
  rl.question('Enter the number of attempts: ', (attemptsInput) => { // enter the number of attempts for the guessing game.  challenge the user.
    numAttempts = Number(attemptsInput);
    console.log(`You will have ${numAttempts} attempts.`);
    askRange();
  });
};

askLimit(); // starts the game
