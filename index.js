document.addEventListener('DOMContentLoaded', () => {
    let onePlayerBtn = document.querySelector('#one-player');
    let twoPlayerBtn = document.querySelector('#two-player');
    let resetBtn = document.querySelector('#reset');
    let playAgainBtn = document.querySelector('#playAgain');
    let grid = document.querySelector('#grid');
    let grids = document.querySelectorAll('#grid>div');
    let scoreDisplay1 = document.querySelector('#player1-score');
    let scoreDisplay2 = document.querySelector('#player2-score');
    let player2 = document.querySelector('#player2');
    let gameOn = false;
    let computer = false;

    let displayWinnerOrDraw = (player) => {
        let displayWinner = document.querySelector('#result');
        displayResult.style.zIndex = '1';
        gameOn = false;
        if(player) {
            displayWinner.innerHTML = `${player} wins!!!`
        } else {
            displayWinner.innerHTML = `Draw!!!`
        }     
    }
    
    let addScore = (player) => {
        let scoreDisplay = scoreDisplay1;
        if (player === 'O') { scoreDisplay = scoreDisplay2}
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

    //is there a simpler way to place 'O' instead of rebuilt the innerHtml
    const givenIndexPlaceO = (combinations) => {
        let text = '';
        // loop the first three combinations [012][345][678] to cover all grids
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                let e = combinations[i][j]
                console.log(e)
                text += `
                <div id="${e.index}">${e.val}</div>
                `
            }
        }        
        return text;
    }
 
    const placeO = () => {
        //get all winning combinations's patterns
        let combinations = winningCombinations.map((condition) => {
            return condition.map((val, i) => {
                return ({index: val, val: playerMove[val]})
            })
        })
        let secPlace = [];
        let thiPlace = [];
        combinations.forEach(c => {
            
            //if there are 2 'O', place O in the third index
            if (c.filter(e => e.val === 'O').length === 2) {
                playerMove[c.find(e => e.val === '').index] = computer;
                return
            }
            if (c.filter(e => e.val === 'X').length === 2) {
                // let i = c.find(e => e.val === '').index;
                // console.log(i);
                // playerMove[i] = 'O'
                // Cannot read properties of undefined (reading 'index')at index.js:85:50
                let targetE = c.find(e => e.val === '')
                targetE.val = 'O';
                playerMove[targetE.index] = 'O'

    
                console.log(givenIndexPlaceO(combinations))
                scoreDisplay1.innerHTML = 10;
                grid.innerHTML = '';
                grid.innerHTML = givenIndexPlaceO(combinations);
                
                
            }
        })
        
        //let index = 0;
        //let betterPlaceGrids = [];
        
        gameOn = true;
        currentPlayer = playerX;
    }

    const gridClicked = function(e){
        if (gameOn === true) {
            let index = e.target.id
            if(!playerMove[index]){
                playerMove[index] = currentPlayer;
                e.target.innerText = currentPlayer;
                if(winningCheck() === true){
                    addScore(currentPlayer) 
                    displayWinnerOrDraw(currentPlayer);
                } else if (playerMove.includes('')===false) {
                    displayWinnerOrDraw();  
                } else {
                    if (computer === 'O') {                        
                        gameOn = false;
                        placeO();                        
                    } else {
                        currentPlayer = currentPlayer === playerX ? playerO : playerX
                    }                    
                }                            
            }
            
        }
    }
    

    onePlayerBtn.addEventListener('click', ()=>{
        if (gameOn === false && computer === false) {
            gameOn = true;
            computer = 'O';
            player2.innerHTML = 'Computer  ';
        } 
    })

    twoPlayerBtn.addEventListener('click', ()=>{
        if (gameOn === false && computer === false) {
            gameOn = true;
        } 
    })

    const clearGrid = () => {
        displayResult.style.zIndex = '-1';
        grids.forEach(grid => {
            grid.innerHTML = '';
        })
        playerMove =['','','','','','','','','']
    }

    resetBtn.addEventListener('click', ()=>{
        clearGrid();
        scoreDisplay1.innerHTML = 0;
        scoreDisplay2.innerHTML = 0;
        gameOn = false;
        computer = false;
    })

    

    playAgainBtn.addEventListener('click', ()=>{
        gameOn = true;
        clearGrid();
    })


    grids.forEach(grid => {
      grid.addEventListener('click', gridClicked)
    })
})

