const selections = ["rock", "paper", "scissors"]

console.log("Selections.length is worth "+selections.length)

function getComputerChoice() {
    const randomNumber = Math.floor(Math.random()*selections.length);
    return selections[randomNumber]
}

const computerSelection = getComputerChoice()

let playerSelection = "";

function askPlayersSelection() {
    let answer;
    do {
        answer = prompt(`What are you picking? 
        1 for Rock
        2 for Paper
        3 for Scissors`);
        if (answer === '1') {
            playerSelection = "rock";
            console.log(`You picked rock.`);
        } else if (answer === '2') {
            playerSelection = "paper";
            console.log(`You picked paper.`);
        } else if (answer === '3') {
            playerSelection = "scissors";
            console.log(`You picked scissors.`);
        } else {
            console.log(`You must pick a number between 1 and 3.`);
        }
    } while (answer !== '1' && answer !== '2' && answer !== '3')
}

function playRound() {
    askPlayersSelection();
    if (
        (playerSelection === computerSelection)
    ) {
        return `Draw. No winner this time.`;
    } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        return `You have won with ${playerSelection} against ${computerSelection}.`;
    } else {
        return `Computer has won with ${computerSelection} against ${playerSelection}.`;
    }
}

console.log(playRound());
