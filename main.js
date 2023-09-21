const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartBtn = document.querySelector('.restartBtn');
const alertBox = document.querySelector('.alertBox');

//making variables
let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

player1.textContent = `Player 1: ${currentPlayer}`;
player2.textContent = `Player 2: ${nextPlayer}`;

//function to start your game
const startGame = () => {   
    gameCells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
}

const handleClick= (e) => {
    if(e.target.textContent === ''){
        e.target.textContent =  playerTurn;
       if( checkWin()){
       // console.log(`${playerTurn} is a Winner`);
        showAlert(`${playerTurn} is a Winner`);
        disableCells();
       }
       else if(checkTie()){
        //console.log(`It's a Tie!`);
        showAlert(`It's a Tie!`);
        disableCells();
       }
       else {
        changePlayerTurn();
        showAlert(`Turn for player${playerTurn}`);
       }
    } 

}

//fxn to change player
const changePlayerTurn = () => {
    if(playerTurn === currentPlayer){
        playerTurn = nextPlayer;
    }
    else {
        playerTurn = currentPlayer;
    }
}

//function to check win
const checkWin = () => {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [7, 8, 9],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winningConditions.length; i++) {
        const [pose1, pose2, pose3] = winningConditions[i];

        if(gameCells[pose1].textContent !== '' && gameCells[pose1].textContent === gameCells[pose2].textContent && gameCells[pose2].textContent === gameCells[pose3].textContent){
            return true;
        }  
    }

    return false;
}


//fxn to check for a tie
const checkTie = () => {
    let emptyCellsCount = 0;
    gameCells.forEach(cell => {
        if(cell.textContent === ''){
            emptyCellsCount++;
        }
    });

    return emptyCellsCount === 0 && !checkWin();
}

//fxn to disable gameBoard cells after a win or tie
const disableCells = () => {
    gameCells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.classList.add('disabled');
    });
}

//fxn to restart Game
const restartGame = () => {
    gameCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    startGame();
}

const showAlert = (msg) => {
    
        alertBox.style.display = "block";
        alertBox.textContent = msg;
        setTimeout(() => {
            alertBox.style.display = "none";
        },3000);
    
}

//Adding eventlistener to restart button
restartBtn.addEventListener('click', restartGame);

// calling startGame fxn
startGame();
