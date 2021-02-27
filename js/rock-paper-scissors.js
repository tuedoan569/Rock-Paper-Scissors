/************************************************************/
/* Author:          Tue Doan                                */
/* Creation Date:   Feb 20, 2021                            */
/* Due Date:        Mar 04, 2021                            */
/* Course:          Miles Training Lab                      */
/* Assignment:      Project #2                              */
/* Filename:        rock-paper-scissors.js                  */
/* Purpose: Program is a rock, paper, and scissors game.    */
/************************************************************/

/**
 * Run the rock-paper-scissors game on the console
 * 
 */
function playGame() {
    const selections = {
        ROCK : {
            value: "rock",
            id: 0
        },
        PAPER : {
            value: "paper",
            id: 1
        },
        SCISSORS : {
            value: "scissors",
            id: 2
        }
    }
    const resultLabels = {
        WIN : "You Win!",
        LOSE : "You lose!",
        TIE : "It's a tie."
    }
    
    let rounds;
    let playerSelection = "";
    let pcSelection = 0;
    let validNum = false;

    let results = {
        player: 0,
        pc: 0,
        tie:0,
        lastResult: 0
    }
    while (!validNum) {
        rounds  = promptUser("How many round do you want to play?");
        validNum = validateNum(rounds);
    }
    rounds = parseInt(rounds);
    

    for (let x = 0; x < rounds; x++) {
        console.log("Round ", x+1 );
        let selected = false;
      
        while (!selected) {
            playerSelection = promptUser("Please make your selection:\n Must be \"rock\", \"paper\", \"scissors\"\nNote: case insensitive");
            selected = validateSelection(playerSelection, selections);
        }
       
        pcSelection = randomNum(selections);
        console.log("Player chose " + playerSelection);
        console.log("PC chose " + pcSelection);

        results = playRound(playerSelection, pcSelection, selections, results);
        
        displayScore(results, resultLabels);
    }
    console.log("End Game");
}

/**
 * 
 * @param {string} playerSelection user entered input from prompt
 * @param {string} pcSelection The computer random generated selection.
 * @param {object} selections The key-value pair object contains predefined selections.
 * @param {object} results The key-value pair object that contains the score.
 * @return (object) The key-value pair object that contains the score.
 */
function playRound(playerSelection, pcSelection, selections, results) {
    if (playerSelection == pcSelection) {
        results.tie++;
        results.lastResult = 2;
        return results;
    } else if (playerSelection == selections.ROCK.value && pcSelection == selections.SCISSORS.value || playerSelection == selections.PAPER.value && pcSelection == selections.ROCK.value || playerSelection == selections.SCISSORS.value && pcSelection == selections.PAPER.value) {
        results.player++;
        results.lastResult = 0;
        return results;
    } else {
        results.pc++;
        results.lastResult = 1;
        return results;
    }
}

/**
 * 
 * Display message/prompt to user and get an input.
 * 
 * @param {string} message The message/prompt displays to the user.
 * @return {string} The user entered input from prompt.
 */
function promptUser(message) {
    return(prompt(message));
}

/**
 * 
 * Generate a random number which corresponding to a selection in the list of selections.
 * 
 * @param {object} selections The key-value pair contains predefined selections
 * @return {string} The random computer selection.
 */
function randomNum(selections) {
    
    let randomNum = Math.floor(Math.random() * Object.keys(selections).length);

    for (const[key, value] of Object.entries(selections)) {
        if (value.id == randomNum) {
            return value.value;
        }
    }
    return selections.ROCK.value;
}

/**
 * 
 * Display the current score after each round.
 * 
 * @param {object} results The key-value pair object that contains results/scores 
 * @param {object} resultLabels The key-value pair object labels that will display after each round.
 */
function displayScore(results, resultLabels) {
    let resultLabel = "";
    if (results.lastResult == 0) {
        resultLabel = resultLabels.WIN;
    } else if (results.lastResult == 1) {
        resultLabel = resultLabels.LOSE;
    } else if (results.lastResult == 2) {
        resultLabel = resultLabels.TIE;
    } else {
        resultLabel = "Something went wrong.";
    }
    console.log(resultLabel);
    console.log("The current score, Player: " + results.player + "\tPC: " + results.pc + "\tTie: " + results.tie);
    console.log("End Round");
}

/**
 * 
 * Validate the user entered input is in the given string array
 * 
 * @param {string} selection The user entered input.
 * @param {object} selections The key-value object contains predefined selections that user input will be compare against.
 * @return Return true if the user entered input is in the predefined selection array, otherwise false.
 */
function validateSelection(selection, selections) {
    selection = selection.toLowerCase();

    for (const[key, value] of Object.entries(selections)) {
        if (value.value == selection) {
            return true;
        }
    }
    return false;

}

/**
 * 
 * Validate the user entered input is number.
 * 
 * @param {number} num The user input number.
 * @return {boolean} Return true if is a number, otherwise false.
 */
function validateNum(num) {
    return !(isNaN(num));
}
