document.addEventListener('DOMContentLoaded', () => {
    let startBtn = document.querySelector('#start');
    let resetBtn = document.querySelector('#reset');
    let playAgainBtn = document.querySelector('#playAgain');
    let grid = document.querySelectorAll('#grid');
    let grids = document.querySelectorAll('#grid>div');
    let scoreDisplay1 = document.querySelector('#player1-score');
    let scoreDisplay2 = document.querySelector('#player2-score');

    let displayWinnerOrDraw = (player) => {
        let displayWinner = document.querySelector('#result');
        displayResult.style.zIndex = '1';
        if(player) {
            displayWinner.innerHTML = `${player} wins!!!`
        } else {
            displayWinner.innerHTML = `Draw!!!`
        }     
    }
    
    let addScore = (player) => {
        let scoreDisplay = scoreDisplay1;
        if (player === 'playerX') { scoreDisplay = scoreDisplay2}
        let score = parseInt(scoreDisplay.innerHTML);
        score+=10;
        scoreDisplay.innerHTML = score;
    }
  
    let playerMove = ['','','','','','','','','']
    const playerX = "X";
    const playerO = "O";
    let currentPlayer = playerX;
    let winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    const winningCheck = function (){
        for (const condition of winningCombinations){
            let [a,b,c] = condition
            if (playerMove[a] && (playerMove[a] === playerMove[b]) && playerMove[a] === playerMove[c]){
                return true
            }
        }
    }
    const gridClicked = function(e){
        let index = e.target.id
        if(!playerMove[index]){
            playerMove[index] = currentPlayer;
            e.target.innerText = currentPlayer;
            if(winningCheck() == true){
                addScore(currentPlayer) 
                setTimeout(() => displayWinnerOrDraw(currentPlayer), 100);   
        }
        setTimeout(() => {currentPlayer = currentPlayer === playerX ? playerO : playerX}, 100)
        }
        if(playerMove.includes('')===false) {
            setTimeout(() => displayWinnerOrDraw(), 100);  
        }
    }
    

    startBtn.addEventListener('click', ()=>{
        alert('start')
    })

    resetBtn.addEventListener('click', ()=>{
        alert('reset')
    })

    playAgainBtn.addEventListener('click', ()=>{
        alert('playAgain')
    })
    grids.forEach(grid => {
      grid.addEventListener('click', gridClicked, {once: true})
    })
})

