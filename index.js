$(document).ready(function () {
    // Variable to keep track of the current player
    let currentPlayer = "X";

    // Variable to keep track of the number of moves
    let moveCount = 0;

    // Function to handle a player's move
    function handleMove() {
        // Check if the grid item is empty
        if ($(this).find(".play").text() === "") {
            // Update the grid item with the current player's symbol
            $(this).find(".play").text(currentPlayer);
            moveCount++;

            // Check for a winner
            if (checkForWin(currentPlayer)) {
                handleGameEnd(currentPlayer + " wins!");
            } else if (moveCount === 9) {
                handleGameEnd("It's a tie!");
            } else {
                // Switch the player
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                $(".head-line").text("Player " + currentPlayer + "'s turn");
            }
        }
    }

    // Function to check for a win
    function checkForWin(player) {
        const winningCombinations = [
            ["a1", "a2", "a3"],
            ["b1", "b2", "b3"],
            ["c1", "c2", "c3"],
            ["a1", "b1", "c1"],
            ["a2", "b2", "c2"],
            ["a3", "b3", "c3"],
            ["a1", "b2", "c3"],
            ["a3", "b2", "c1"]
        ];

        // Check all winning combinations
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                $(".grid-item." + a + " .play").text() === player &&
                $(".grid-item." + b + " .play").text() === player &&
                $(".grid-item." + c + " .play").text() === player
            ) {
                return true;
            }
        }

        return false;
    }

    // Function to restart the game
    function restartGame() {
        // Clear the grid items
        $(".play").text("");

        // Reset the current player and move count
        currentPlayer = "X";
        moveCount = 0;

        // Show the initial message
        $(".head-line").text("P L A Y");

        // Reattach the event listener for grid item clicks
        $(".grid-item").on("click", handleMove);
    }

    // Function to handle game end
    function handleGameEnd(message) {
        // Display the game end message
        $(".head-line").text(message);

        // Wait for 3 seconds and restart the game
        setTimeout(function () {
            restartGame();
        }, 3000);
    }

    // Event listener for grid item clicks
    $(".grid-item").on("click", handleMove);
});
