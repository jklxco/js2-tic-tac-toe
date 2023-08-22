const gameboard = (() => {
  (function _initaliseBoard() {
    let squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", (e) => {
        gameInProgress === true ? currentPlayer.playCounter(e) : 0;
      });
    });
    _addHoverEventListener(squares)
  })();

  function _addHoverEventListener(squares){
    squares.forEach((square) => {
      square.addEventListener("mouseover", (e) => {
        gameInProgress === true ? _hoverCounter(e) : 0;    
      });
      square.addEventListener("mouseout", (e) => {
        gameInProgress === true ? _hoverCounter(e) : 0;    
      });
    });
  }

  function _hoverCounter(e) {
    index = e.target.id.charAt(e.target.id.length - 1);
    let square = document.querySelector(`#square-${index}`);
    (!square.classList.contains('cross') && !square.classList.contains('circle')) ?
      (currentPlayer.counter === 'X') ? square.classList.toggle('cross-hover') :
      square.classList.toggle('circle-hover') : 0;
  }

  function updateBoard() {
    boardArray.forEach((item, index) => {
      let square = document.querySelector(`#square-${index}`);
      if (item === 'X' ) {
        square.classList.remove('cross-hover')
        square.classList.add('cross')
      } else if (item === 'O' ) {
        square.classList.remove('circle-hover')
        square.classList.add('circle')
      }
      
    });
  }

  return { updateBoard };
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

  function handleCounter() {
    if (_checkWinner()) {
      _handleWin();
    } else if (!boardArray.includes("")) {
      _handleDraw();
    } else {
      _switchTurn();
    }
  }

  function _checkWinner() {
    let winner = false;
    _winningArray.forEach((array) => {
      if (
        boardArray[array[0]] == currentPlayer.counter &&
        boardArray[array[1]] == currentPlayer.counter &&
        boardArray[array[2]] == currentPlayer.counter
      ) {
        winner = true;
      }
    });
    return winner;
  }

  function _switchTurn() {
    currentPlayer == playerTwo
      ? (currentPlayer = playerOne)
      : (currentPlayer = playerTwo);
  }

  function _handleWin() {
    gameInProgress = false;
  }

  function _handleDraw() {
    gameInProgress = false;
  }

  return { handleCounter };
})();

const playerFactory = (name, counter) => {
  function playCounter(e) {
    index = e.target.id.charAt(e.target.id.length - 1);
    if (boardArray[index] == "") {
      boardArray[index] = counter;
      gameboard.updateBoard();
      game.handleCounter();
    }
  }
  return { name, counter, playCounter };
};

let gameInProgress = true;
let boardArray = ["", "", "", "", "", "", "", "", ""];
const playerOne = playerFactory("Jack", "X");
const playerTwo = playerFactory("Rachel", "O");

let currentPlayer = playerOne;
