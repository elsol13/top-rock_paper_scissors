// Jeu 





// Declaring the main array of choices 
const selections = ["rock", "paper", "scissors"]

let nameIsFilled = false;


// Get the parent div to append the generated elements 
const choicesContainer = document.getElementById("choicesContainer");

const selectingPaper = document.getElementById('selectingPaper');
const selectingRock = document.getElementById('selectingRock');
const selectingScissors = document.getElementById('selectingScissors');

// Loop through the selections array and create the elements dynamically 
/*
for (const selection of selections) {
    const cardSelection = document.createElement("div");
    cardSelection.className = "card-selection";

    const img = document.createElement("img");
    img.src = `media/${selection}.png`;
    img.alt = "";
    img.className = "player-selection";

    const p = document.createElement("p");
    p.className = "selection-name";
    p.textContent = selection.charAt(0).toUpperCase() + selection.slice(1);

    // Append the image and paragraph to the cardSelection div
    cardSelection.appendChild(img);
    cardSelection.appendChild(p);

    // Append the cardSelection div to the choicesContainer
    choicesContainer.appendChild(cardSelection);
}
*/


const startBtn = document.getElementById("start-btn")
const topContainer = document.getElementById("top-container");

const nameInput = document.getElementById("name")
let showName = document.getElementById("player-name")

// Animation du bouton après input
nameInput.addEventListener("input", function() {
    startBtn.classList.add("jumpy-btn")
    startBtn.disabled = false;
})

// Lancement du jeu OK
startBtn.addEventListener("click", function () {
    const playerName = nameInput.value;
    document.getElementById("form").style.display="none";
    startBtn.style.display="none";
    // document.getElementById("title-1").classList.add("smaller-title");
    document.getElementById("title-1").style.display="none";
    topContainer.style.display="flex";
    nameIsFilled = true;
})

let playerWin = false; 
let playerSelection = "";

let selectedOption;
const playerSelections = document.querySelectorAll('.player-selection');

// Player picking 
playerSelections.forEach(selection => {
    selection.addEventListener("click", () => {
        if (nameIsFilled) {
            selectedOption = selection.id.replace("selecting", "");
            console.log("You picked " + selectedOption);
            playRound(selectedOption.toLowerCase());
        } else {
            console.log("Please fill in your name before making a selection.");
        }
    });
});


/*selectingPaper.addEventListener("click", () => {
    selectingPaper.classList.toggle("player-selection");
    console.log("You picked paper");
    playRound("paper");
  }); */



// Updating the UI after a round 
function updateUI(result) {
    // Change the colors 
    if (playerWin) {
        const selectedOptionElement = document.querySelector(`#selecting${playerSelection}`);
        // selectedOptionElement.classList.add("hasWon"); 
    }
}
  
let computerSelection = getComputerChoice()

// Get the computer's random selection 
function getComputerChoice() {
    const randomNumber = Math.floor(Math.random()*selections.length);
    return selections[randomNumber]
}

/*
// Play a game
function playGame() {
    for (i=0; i<4; i++) {
        playRound();
        (playerWin) ? (playerWon+=1) : (computerWon+=1);
    }
}
*/

// Play a round
function playRound(playersChoice) {
    playerSelection = playersChoice;
    const computerSelection = getComputerChoice();
    console.log(`Computer picked ${computerSelection}`);

    // TO-DO: change the CSS of that which was selected by computer

    let result = ""
    if (
        playerSelection === computerSelection
    ) {
        result = `No winner this time, ${computerSelection} vs. ${playerSelection}.`;
    } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        playerWin = true;
        result = `You have won, 
        ${playerSelection} beats ${computerSelection}.`;
    } else {
        result = `You have lost, 
        ${computerSelection} beats ${playerSelection}.`;
    }
    console.log(result)
    updateUI(result)
}
