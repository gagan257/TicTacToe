var board = ['', '', '', '', '', '', '', '', ''];
var currentPlayer = 'X';
var gameOver = false;


var cells = document.querySelectorAll('.cell');
for (var i = 0; i < cells.length; i++) {
	cells[i].addEventListener('click', function() {
		if (gameOver || this.textContent !== '') {
			return;
		}
		var index = this.getAttribute('id');
		board[index] = currentPlayer;
		this.textContent = currentPlayer;
		checkWin();
		switchPlayer();
	});
}


function checkWin() {
	var winCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for (var i = 0; i < winCombos.length; i++) {
		if (board[winCombos[i][0]] === currentPlayer && 
			board[winCombos[i][1]] === currentPlayer && 
			board[winCombos[i][2]] === currentPlayer) {
			alert(currentPlayer + ' wins!');
			gameOver = true;
			break;
		}
	}
}


function switchPlayer() {
	if (currentPlayer === 'X') {
		currentPlayer = 'O';
	} else {
		currentPlayer = 'X';
	}
}