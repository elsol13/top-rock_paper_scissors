const selections = ["rock", "paper", "scissors"];

const nameInput = document.getElementById('name');
const startButton = document.getElementById('start-btn');
const playAgainButton = document.getElementById('again-btn');

const form = document.getElementById('form');
const roundNumber = document.getElementById('round-number');

  
// F to start the game once the button is pressed 
startButton.addEventListener('click', () => {
    document.getElementById('title-1').style.display="none";
    document.getElementById('top-container').style.display="flex";
    startButton.style.display="none";
    // Call the playGame function to start the game
    playGame();
  });
  
// Sur la base de la table selection, création des img
const container = document.querySelector('.choices');
selections.forEach(selection => {
  const card = document.createElement('div');
  card.className = 'card-selection';
  card.setAttribute('data-choice', selection);

  const img = document.createElement('img');
  img.src = `media/${selection}.png`;
  img.alt = "";
  img.className = 'player-selection';

  const p = document.createElement('p');
  p.className = 'selection-name';
  p.textContent = selection.charAt(0).toUpperCase() + selection.slice(1);

  card.appendChild(img);
  card.appendChild(p);
  container.appendChild(card);
});

const roundResults = () => {
  const rounds = document.querySelector('#rounds');

  for (i=1; i<6; i++) {
    const roundCard = document.createElement('div');
    const roundCircle = document.createElement('div');
    roundCard.className = 'round-card'
    roundCircle.className = 'circle';
    roundCircle.id = `circle-${i}`;
    const roundResult = document.createElement('p');
    roundResult.className = 'round-score';
    roundResult.id = `score-${i}`;

    rounds.appendChild(roundCard)
    roundCard.appendChild(roundCircle)
    roundCard.appendChild(roundResult)
  }
};

roundResults();



function getPlayerChoice() {
  return new Promise((resolve) => {
    const choices = document.querySelectorAll('.player-selection');
    const listener = (event) => {
      const choice = event.currentTarget.parentElement.getAttribute('data-choice');
      resolve(choice);
      choices.forEach((choice) => choice.removeEventListener('click', listener));
    };
    choices.forEach((choice) => choice.addEventListener('click', listener));
  });
}

// F that determines who wins the round 
function playRound(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return "draw";
  if ((playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")) return "player";
  return "computer";
}

// Main F, handles the 5 rounds 
async function playGame() {
  let playerWins = 0;
  let computerWins = 0;
  const roundNames = ['One', 'Two', 'Three', 'Four', 'Five'];

  for (let i = 0; i < 5; i++) { // Loop of the BO5
    //TODO: update the round number
    if (i !== 0) console.log(`Waiting for you to pick`)

    roundNumber.innerText = `Round ${roundNames[i]}`;

    const playerChoice = await getPlayerChoice(); // Wait for the player to pick 
    const computerChoice = selections[Math.floor(Math.random() * 3)]; // Computer's random pick 

    const winner = playRound(playerChoice, computerChoice);
    console.log(`You picked ${playerChoice} and the computer picked ${computerChoice}`)

    if (winner === "player") { 
      playerWins++;
      document.getElementById(`circle-${i+1}`).classList.add('round-won');
      document.getElementById(`score-${i+1}`).innerText=`Won`;
    }
    if (winner === "computer") { 
      computerWins++; 
      document.getElementById(`circle-${i+1}`).classList.add('round-lost');
      document.getElementById(`score-${i+1}`).innerText=`Lost`;
    }
    if (winner === "draw") { 
      document.getElementById(`circle-${i+1}`).classList.add('round-draw');
      document.getElementById(`score-${i+1}`).innerText=`Draw`;
    }

    console.log(document.getElementById(`circle-${i+1}`));
    console.log(document.getElementById(`score-${i+1}`));

    (winner === "player") ? console.log(`You won the round ${i}`) : console.log(`Computer won the round ${i}`);

      // Add the coloring of circles here

    if (playerWins === 3 || computerWins === 3) break;  // Breaks the game if three rounds were won 
  } // End of the loop 

  // After all the rounds are played
  if (playerWins === computerWins) {
    roundNumber.innerText = `It's a draw!`;
  } else if (playerWins > computerWins) {
    roundNumber.innerText = `You win!`;
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    let playerSelections = document.getElementsByClassName("player-selection");
    for (let selection of playerSelections) {
      selection.classList.add('jumpy');
    }
  } else {
    roundNumber.innerText = `You lost!`;
    let playerSelections = document.getElementsByClassName("player-selection");
    for (let selection of playerSelections) {
      selection.classList.add('sad');
    }
  
  playAgainButton.classList.remove('hidden');
}}

playAgainButton.addEventListener('click', () => {
  playAgainButton.style.display="none";
  for (i = 0 ; i < 5 ; i++) {
    document.getElementById(`circle-${i}`).classList.remove('round-won');
    document.getElementById(`circle-${i}`).classList.remove('round-draw');
    document.getElementById(`circle-${i}`).classList.remove('round-lost');
  }
  // Call the playGame function to start the game again
  playGame();
});