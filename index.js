document.addEventListener('DOMContentLoaded', () => {
    let onePlayerBtn = document.querySelector('#one-player');
    let twoPlayerBtn = document.querySelector('#two-player');
    let resetBtn = document.querySelector('#reset');
    let playAgainBtn = document.querySelector('#playAgain');
    let grid = document.querySelector('#grid');
    let scoreDisplay1 = document.querySelector('#player1-score');
    let scoreDisplay2 = document.querySelector('#player2-score');
    let player1 = document.querySelector('#player1');
    let player2 = document.querySelector('#player2');
    let gameOn = false;
    let computer = false;

    let displayWinnerOrDraw = (player) => {
        let displayWinner = document.querySelector('#result');
        displayResult.style.zIndex = '1';
        gameOn = false;
        if (player) {
            displayWinner.innerHTML = `${player} wins!!!`;
            addScore(player);
        } else {
            displayWinner.innerHTML = `Draw!!!`
        }
    }

    let addScore = (player) => {
        let scoreDisplay = scoreDisplay1;
        if (player === 'O') { scoreDisplay = scoreDisplay2 }
        let score = parseInt(scoreDisplay.innerHTML);
        score += 10;
        scoreDisplay.innerHTML = score;
    }

    let playerMove = ['', '', '', '', '', '', '', '', '']
    let currentPlayer = 'X';
    let winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const startGridClickEvent = () => {
        document.querySelectorAll('#grid>div').forEach(grid => {
            grid.addEventListener('click', gridClicked)
        });
    }

    const winningCheck = function () {
        for (const condition of winningCombinations) {
            let [a, b, c] = condition
            if (playerMove[a] && (playerMove[a] === playerMove[b]) && playerMove[a] === playerMove[c]) {
                return true
            }
        }
    }

    

    const placeO = (i) => {
        const placeOHTML = (playerMove) => {
            let text = '';
            for (let i = 0; i < 9; i++) {
                text += `
                <div id="${i}">${playerMove[i]}</div>
                `
            }
            return text;
        }
        playerMove[i] = 'O';
        grid.innerHTML = '';
        grid.innerHTML = placeOHTML(playerMove);
        startGridClickEvent();
    }

    const switchPlayer = (player) => {
        if (currentPlayer === 'X') {
            currentPlayer = 'O';
            player1.style.color = '';
            player2.style.color = 'green';
        } else {
            currentPlayer = 'X';
            player1.style.color = 'green';
            player2.style.color = '';
        }
    }

    const computerTurn = () => {
        let count;
        let iToUse;
        let checkAgain = true;

        //if there are 2 'O', place O in the index of ''
        for (let i = 0; i < winningCombinations.length; i++) {
            count = 0;
            iToUse = -1;
            for (let j = 0; j < winningCombinations[i].length; j++) {
                let index = winningCombinations[i][j];
                if (playerMove[index] === 'O') { count++ }
                if (playerMove[index] === '') { iToUse = index }
            }
            if (count === 2 && iToUse != -1) {
                placeO(iToUse);
                displayWinnerOrDraw('O');
                checkAgain = false;
                break;
            }
        }

        //if there are 2 'X', place O in the index of ''
        if (checkAgain === true) {
            for (let i = 0; i < winningCombinations.length; i++) {
                count = 0;
                iToUse = -1;
                for (let j = 0; j < winningCombinations[i].length; j++) {
                    let index = winningCombinations[i][j];
                    if (playerMove[index] === 'X') { count++ }
                    if (playerMove[index] === '') { iToUse = index; }
                }
                if (count === 2 && iToUse != -1) {
                    placeO(iToUse)
                    checkAgain = false;
                    break;
                }
            }
        }

        //if there are 1 'O' and no 'X', place O in the second index of ''
        if (checkAgain === true) {
            for (let i = 0; i < winningCombinations.length; i++) {
                count = 0;
                iToUse = -1;
                let countX = 0;
                for (let j = 0; j < winningCombinations[i].length; j++) {
                    let index = winningCombinations[i][j];
                    if (playerMove[index] === 'O') { count++ }
                    if (playerMove[index] === 'X') { countX++ }
                    if (playerMove[index] === '') { iToUse = index; }
                }
                if (count === 1 && countX === 0 && iToUse != -1) {
                    placeO(iToUse);
                    checkAgain = false;
                    break;
                }
            }
        }

        //if there is no 'O', place O in the middle or if middle has 'X', place O in the first index of ''
        if (checkAgain === true) {
            if (playerMove[4] === '') {
                iToUse = 4;
            } else {
                iToUse = playerMove.indexOf('');
            }
            placeO(iToUse);
        }

        if (playerMove.includes('') === false) {
            displayWinnerOrDraw();
        }

        gameOn = true;

        //Checking whether it is 'draw' to select the player;
        if (displayResult.style.zIndex != '1') {
            switchPlayer(currentPlayer)
        }
    }

    const gridClicked = function (e) {
        if (gameOn === true) {
            let index = e.target.id
            if (!playerMove[index]) {
                playerMove[index] = currentPlayer;
                e.target.innerText = currentPlayer;
                if (winningCheck() === true) {
                    displayWinnerOrDraw(currentPlayer);
                } else if (playerMove.includes('') === false) {
                    displayWinnerOrDraw();
                } else {
                    if (computer === 'O') {
                        gameOn = false;
                        switchPlayer(currentPlayer);
                        setTimeout(computerTurn, 500);
                    } else {
                        switchPlayer(currentPlayer)
                    }
                }
            }

        }
    }

    onePlayerBtn.addEventListener('click', () => {
        if (gameOn === false && computer === false) {
            gameOn = true;
            computer = 'O';
            player1.style.color = 'green';
            player2.innerHTML = 'Computer  ';
            onePlayerBtn.style.color = 'gray';
        }
    })

    twoPlayerBtn.addEventListener('click', () => {
        if (gameOn === false && computer === false) {
            gameOn = true;
            player1.style.color = 'green';
            twoPlayerBtn.style.color = 'gray';
        }
    })

    const clearGrid = () => {
        displayResult.style.zIndex = '-1';
        document.querySelectorAll('#grid>div').forEach(grid => {
            grid.innerHTML = '';
        })
        playerMove = ['', '', '', '', '', '', '', '', '']
    }

    resetBtn.addEventListener('click', () => {
        clearGrid();
        scoreDisplay1.innerHTML = 0;
        scoreDisplay2.innerHTML = 0;
        onePlayerBtn.style.color = '';
        twoPlayerBtn.style.color = '';
        player1.style.color = '';
        player2.style.color = '';
        gameOn = false;
        computer = false;
    })

    playAgainBtn.addEventListener('click', () => {
        clearGrid();
        setTimeout(() => {
            if (currentPlayer === 'O' && computer === 'O') {
                placeO(4);
                switchPlayer(currentPlayer)
            }
            gameOn = true;
            startGridClickEvent();
        }, 500)
    })

    startGridClickEvent();
})

