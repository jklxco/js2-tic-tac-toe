const gameboard = (() => {
    
    (function _initaliseBoard() {
        let squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', (e) => {
                currentPlayer.playCounter(e)
                _updateBoard();
                game.handleCounter();
            })
        })
        
    })();

    function _updateBoard() {
        boardArray.forEach((item, index) => {
            let square = document.querySelector(`#square-${index}`);
            square.innerText = item;
        });
    };

    return {};
})();

const game = (() => {
    const _winningArray = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
    ];

    function handleCounter(){
        if ( _checkWinner() ) {
            console.log('Winner!!!')
            _handleWin();
        } else if ( !boardArray.includes('') ){
               console.log('It\'s A Tie!');
            _handleDraw();
        } else {
            _switchTurn();
        }
    }

    function _checkWinner(){
        let winner = false; 
        _winningArray.forEach((array) => {
            if (boardArray[array[0]] == currentPlayer.counter &&
                boardArray[array[1]] == currentPlayer.counter && 
                boardArray[array[2]] == currentPlayer.counter) {
                    winner = true;
            }
        })
        return winner
    }

    function _switchTurn(){
        (currentPlayer == playerTwo) ? currentPlayer = playerOne : currentPlayer = playerTwo;
    }

    function _handleWin(){

    }

    function _handleDraw(){

    }

    return {handleCounter}
})();


const playerFactory = (name, counter) => {
    
    function playCounter(e){
        index = e.target.id.charAt(e.target.id.length-1)
        boardArray[index] = counter;
        
    }

    return {name, counter, playCounter}
};




let boardArray = ['', '', '', '', '', '', '', '', ''];
const playerOne = playerFactory('Jack', 'X');
const playerTwo = playerFactory('Rachel', 'O');

let currentPlayer = playerTwo;