
  //This helps me set up some constants for the players, moves to 0 as there
  //only nine moves possible.  set gameover to false so for loop can run.  
  //In addtion, I needed to set up the diffrent winning combinations.  
  
  let  currentPlayer = "X";
  let  moves = 0;
  let  gameOver = false;
  let  winningCombinations = [
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    [[0,0], [1,1], [2,2]],
    [[0,2], [1,1], [2,0]]
  ];

//This helps me check for a winner.  for loop can run up to nine times.  
//If no winner, than game over.  IF it can find a winning combination, then 
//will stop the for loop.  
  function checkWinner() {
    for (let i = 0; i < winningCombinations.length; i++) {
      let combo = winningCombinations[i];
      let symbol1 = $("#board .box[data-pos='" + combo[0][0] + "," + combo[0][1] + "']").text();
      let symbol2 = $("#board .box[data-pos='" + combo[1][0] + "," + combo[1][1] + "']").text();
      let symbol3 = $("#board .box[data-pos='" + combo[2][0] + "," + combo[2][1] + "']").text();
      if (symbol1 !== "" && symbol1 === symbol2 && symbol1 === symbol3) {
        return symbol1;
      }
    }
    return null;
  }

  //this checks for a tie which occurs after all positions have been filled

  function checkTie() {
    return moves === 9 && !checkWinner();
  }

  //when the game ends, this jquery function will send message declaring the winner. 
  function endGame(result) {
    gameOver = true;
    $("#message").text(result);
  }


  //this sets the board with a click function that lets the current player, wether
  //X or O.  If there is a winner, it will declare it.  If not then states who next player
  //is followed by checking to see if current player has won.  If winner, then ends
  //game, then checks for tie, if not tie or winner, than lets next player play.  
  $("#board").on("click", ".box", function() {
    if (gameOver || $(this).text() !== "") return;

    $(this).text(currentPlayer);
    moves++;

    let  winner = checkWinner();
    if (winner) {
      endGame("Player " + winner + " wins!");
    } else if (checkTie()) {
      endGame("It's a tie!");
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      $("#message").text("Player " + currentPlayer + "'s turn");
    }
  });

  $("#message").text("Player " + currentPlayer + "'s turn");

   $(`#resetButton`).click(function(){
    location.reload();
   })





