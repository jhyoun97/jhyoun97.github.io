let prevPlayerSelection = "";
let playerSelection; 


function start() {
    document.querySelector("#game-start").addEventListener("click", () => {
        document.querySelector("#game-start").style.display = "none";
        document.querySelector("#play-hand").style.display = "block";
        document.querySelector("h2").innerHTML = "Make your selection";
        playHand();
    });
}

function playHand() {
    let choices = document.querySelectorAll(".choice");
    let selected = false;
    choices.forEach((choice, i , arr) => {
        choice.addEventListener("click", (e) => {
            playerSelection = arr[i].id;
            if (prevPlayerSelection != playerSelection || selected == false) {
                e.target.style.color = "#FE00B7";
                e.target.style.opacity = "1";
                document.querySelector("h2").innerHTML = "You selected: " + playerSelection;
                let parent = e.target.parentNode.parentNode;

                const siblings = [].slice.call(parent.children).filter(function (child) {
                    return child !== e.target.parentNode;
                })
                console.log(playerSelection);
                console.log(siblings);

                siblings.forEach((sibling) => {
                    sibling.childNodes[1].style.color = "white";
                    sibling.childNodes[1].style.opacity = "0.5";
                })
                selected = true;
            } else {
                e.target.style.color = "white";
                e.target.style.opacity = "0.5";
                document.querySelector("h2").innerHTML = "Make your selection";
                selected = false;
            }

            prevPlayerSelection = playerSelection;

        })
    });
    document.querySelector("#play-hand").addEventListener("click", () => {
        if (!selected) {
            document.querySelector("h2").innerHTML = "Make your selection before playing your hand";
        } else {
            Play_Game();
            document.querySelector("#play-hand").style.display = "none";
            document.querySelector("#play-again").style.display = "block";
            document.querySelector("#play-again").addEventListener("click", () => {
                location.reload();
            });
        }

    })
    
}

function Play_Game() {

    let rand = Math.floor(Math.random() * 3);
    let computer;
    switch(rand) {
        case 0:
            computer = "rock";
            break;
        case 1:
            computer = "paper";
            break;
        case 2:
            computer = "scissors"
            break;
    }


    if (playerSelection == computer) {
        draw();
    }
    else if(playerSelection == "rock") {
        (computer == "paper") ? computer_win() : player_win();
    } 
    else if(playerSelection == "paper") {
        (computer == "scissors") ? computer_win() : player_win();
    }
    else if(playerSelection == "scissors") {
        (computer == "rock") ? computer_win() : player_win();
        computerElement = document.querySelector("#scissors");
    }

    if (playerSelection == computer) {
        document.querySelector(`#${computer}`).childNodes[1].style.color = "green";
        document.querySelector(`#${computer}`).childNodes[1].style.opacity = "1";
    } else {
        document.querySelector(`#${computer}`).childNodes[1].style.color = "#D2FFAF";
        document.querySelector(`#${computer}`).childNodes[1].style.opacity = "1";
    }

}

function player_win() {
    if (playerSelection == "rock") {
        document.querySelector("h2").innerHTML = "Rock Crushes Scissors. You Win!";
    } else if (playerSelection == "paper") {
        document.querySelector("h2").innerHTML = "Paper Covers Rock. You Win!";
    } else if (playerSelection == "scissors") {
        document.querySelector("h2").innerHTML = "Scissors Cuts Paper. You Win!";
    }
}

function computer_win() {
    if (playerSelection == "rock") {
        document.querySelector("h2").innerHTML = "Paper Covers Rock. You Lose!";
    } else if (playerSelection == "paper") {
        document.querySelector("h2").innerHTML = "Scissors Cuts Paper. You Lose!";
    } else if (playerSelection == "scissors") {
        document.querySelector("h2").innerHTML = "Rock Crushes Scissors. You Lose!";
    }
}

function draw() {
    document.querySelector("h2").innerHTML = "Draw!";
}

start();