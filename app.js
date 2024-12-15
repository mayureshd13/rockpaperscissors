// Scores and DOM Elements
let userscore = 0;
let compscore = 0;
let gameInProgress = true; // Flag to track if game is in progress

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userscorepara = document.querySelector("#user-score");
const compscorepara = document.querySelector("#comp-score");

const drawimg = document.querySelector("#draw");
const winimg = document.querySelector("#win");
const looseimg = document.querySelector("#lose");

const usersps_rock = document.querySelector("#usersps_rock");
const usersps_paper = document.querySelector("#usersps_paper");
const usersps_scissors = document.querySelector("#usersps_scissors");
const compsps_rock = document.querySelector("#compsps_rock");
const compsps_paper = document.querySelector("#compsps_paper");
const compsps_scissors = document.querySelector("#compsps_scissors");

// Audio Elements
const bgMusic = document.querySelector("#background-music");
const winSound = document.querySelector("#win-sound");
const loseSound = document.querySelector("#lose-sound");
const drawSound = document.querySelector("#draw-sound");
const clicksound = document.querySelector("#click-sound")

// Hide All Images
const hideAllImages = () => {
    usersps_rock.style.display = "none";
    usersps_paper.style.display = "none";
    usersps_scissors.style.display = "none";
    compsps_rock.style.display = "none";
    compsps_paper.style.display = "none";
    compsps_scissors.style.display = "none";
    drawimg.style.display = "none";
    winimg.style.display = "none";
    looseimg.style.display = "none";
};

// Generate Computer Choice
const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

// Draw Game Logic
const drawGame = () => {
    console.log("Game draw!");
    msg.innerText = "Game Draw, Play Again!";
    msg.style.backgroundColor = "gray";
    drawimg.style.display = "block";
    winimg.style.display = "none";
    looseimg.style.display = "none";

    // Play draw sound
    drawSound.play();
};

// Show Winner Logic
const showWinner = (userWin, userchoice, CompChoice) => {
    if (userWin) {
        userscore++;
        userscorepara.innerText = userscore;
        msg.innerText = `You win! Your ${userchoice} beats ${CompChoice}`;
        msg.style.backgroundColor = "green";
        winimg.style.display = "block";
        drawimg.style.display = "none";
        looseimg.style.display = "none";

        // Play win sound
        winSound.play();
    } else {
        compscore++;
        compscorepara.innerText = compscore;
        msg.innerText = `You Lose! ${CompChoice} beats Your ${userchoice}`;
        msg.style.backgroundColor = "red";
        looseimg.style.display = "block";
        drawimg.style.display = "none";
        winimg.style.display = "none";

        // Play lose sound
        loseSound.play();
    }
  
    // Check for winner
    if (userscore === 10) {
        showFinalWinner('User');
    } else if (compscore === 10) {
        showFinalWinner('Computer');
    }
};

// Show Final Winner with Popup
const showFinalWinner = (winner) => {
    gameInProgress = false; // Stop further gameplay

    const popup = document.getElementById('winnerPopup');
    const message = document.getElementById('winnerMessage');
    message.textContent = `Congratulations ${winner}! You are the winner!`;
    popup.classList.remove('hidden');
};

// Restart the game
const restartGame = () => {
    userscore = 0;
    compscore = 0;
    userscorepara.innerText = userscore;
    compscorepara.innerText = compscore;
    msg.innerText = "Choose your option to play!";
    msg.style.backgroundColor = "";
    hideAllImages();

    gameInProgress = true; // Allow gameplay again
    const popup = document.getElementById('winnerPopup');
    popup.classList.add('hidden');
};

// Main Game Logic
const playGame = (userchoice) => {
    if (!gameInProgress) return; // Prevent gameplay if a winner has been determined

    console.log("User choice:", userchoice);

    // Hide all images before displaying the current choices
    hideAllImages();

    // Generate computer choice
    const CompChoice = genCompChoice();
    console.log("Computer Choice:", CompChoice);

    // Display user's choice
    if (userchoice === "rock") {
        usersps_rock.style.display = "block";
    } else if (userchoice === "paper") {
        usersps_paper.style.display = "block";
    } else if (userchoice === "scissors") {
        usersps_scissors.style.display = "block";
    }

    // Display computer's choice
    if (CompChoice === "rock") {
        compsps_rock.style.display = "block";
    } else if (CompChoice === "paper") {
        compsps_paper.style.display = "block";
    } else if (CompChoice === "scissors") {
        compsps_scissors.style.display = "block";
    }

    // Determine game outcome
    if (userchoice === CompChoice) {
        // Draw game
        drawGame();
    } else {
        let userWin = true;
        if (userchoice === "rock") {
            userWin = CompChoice === "scissors";
        } else if (userchoice === "paper") {
            userWin = CompChoice === "rock";
        } else if (userchoice === "scissors") {
            userWin = CompChoice === "paper";
        }
        showWinner(userWin, userchoice, CompChoice);
    }
};

// Add event listeners to user choices
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userchoice = choice.getAttribute("id");
        playGame(userchoice);
    });
});

// Add event listener to the restart button
document.getElementById('restartButton').addEventListener("click",()=>{
    clicksound.play();
});
document.getElementById('restartButton').addEventListener("click", restartGame);
