var isPlayer1Active, activeTable, row, column, player1Color, player2Color, gameActive;


// generate initial table
function generateTable(givenRow, givenColumn) {
    // reset active table to clean state
    if (activeTable) {
        const element = document.getElementById("gameTable");
        element.remove();
        activeTable = false;
    }
    gameActive = true;
    // random selection of player colors and which player starts
    setPlayerColor();
    row = givenRow;
    column = givenColumn;

    const table = document.createElement("table");
    table.id = "gameTable";
    const tableBody = document.createElement("tbody");

    if (row == 0) { row = 10; }
    if (column == 0) { column = 8; }

    // creates table rows
    for (let i = 0; i < row; i++) {
        const row = document.createElement("tr");

        // create <td> elemnts in each row
        for (let n = 0; n < column; n++) {
            const cell = document.createElement("td");
            cell.className = "cell";
            const cellDefault = document.createElement("img");
            const cellLabel = document.createElement("label");
            cellLabel.className = "cell";
            cellLabel.innerHTML = "empty";
            cellDefault.src = "empty.png";

            cell.appendChild(cellDefault);
            cell.appendChild(cellLabel);
            cell.addEventListener("mousedown", function () { setStone(n) });
            row.appendChild(cell);
        }
        // add row to tableBody
        tableBody.appendChild(row);
    }
    // add tableBody to table
    table.appendChild(tableBody);
    // add table to body
    document.body.appendChild(table);
    table.setAttribute("border", "10");
    table.setAttribute("style", "background-color: blue");
    activeTable = true;

}


function setStone(chosenColumn) {
    if (gameActive) {
        // Search for first free cell to place stone
        for (let i = row - 1; i >= 0; i--) {
            const test = document.getElementById("gameTable").rows[i].cells[chosenColumn];
            if (test.textContent == "empty") {
                // set stones for player with right color
                if (isPlayer1Active) {
                    if (player1Color == "red") {
                        document.getElementById("gameTable").rows[i].cells[chosenColumn].querySelector("img").src = "red.png";
                        document.getElementById("gameTable").rows[i].cells[chosenColumn].querySelector("label").innerHTML = "red";
                    } else {
                        document.getElementById("gameTable").rows[i].cells[chosenColumn].querySelector("img").src = "yellow.png";
                        document.getElementById("gameTable").rows[i].cells[chosenColumn].querySelector("label").innerHTML = "yellow";
                    }
                } else {
                    if (player2Color == "red") {
                        document.getElementById("gameTable").rows[i].cells[chosenColumn].querySelector("img").src = "red.png";
                        document.getElementById("gameTable").rows[i].cells[chosenColumn].querySelector("label").innerHTML = "red";
                    } else {
                        document.getElementById("gameTable").rows[i].cells[chosenColumn].querySelector("img").src = "yellow.png";
                        document.getElementById("gameTable").rows[i].cells[chosenColumn].querySelector("label").innerHTML = "yellow";
                    }
                }
                break;
            }
        }

        if (checkGameStatus()) {

        } else {
            isPlayer1Active = !isPlayer1Active;
            changeActivePlayer();
        }
    }
}

function checkGameStatus() {
    const gameWin = false;
    // check if there is a win in horizontal direction
    for (let i = 0; i < row; i++) {
        for (let n = 0; n < column - 3; n++) {
            // for less computing time start with next iteration after last failed cell
            // player 1 detection
            if (isPlayer1Active) {
                if (document.getElementById("gameTable").rows[i].cells[n].querySelector("label").innerHTML == player1Color) {
                    if (document.getElementById("gameTable").rows[i].cells[n + 1].querySelector("label").innerHTML == player1Color) {
                        if (document.getElementById("gameTable").rows[i].cells[n + 2].querySelector("label").innerHTML == player1Color) {
                            if (document.getElementById("gameTable").rows[i].cells[n + 3].querySelector("label").innerHTML == player1Color) {
                                winner("Player1");
                            } else { n = n + 3; }
                        } else { n = n + 2; }
                    } else { n = n + 1; }
                }
                // player 2 detection
            } else {
                if (document.getElementById("gameTable").rows[i].cells[n].querySelector("label").innerHTML == player2Color) {
                    if (document.getElementById("gameTable").rows[i].cells[n + 1].querySelector("label").innerHTML == player2Color) {
                        if (document.getElementById("gameTable").rows[i].cells[n + 2].querySelector("label").innerHTML == player2Color) {
                            if (document.getElementById("gameTable").rows[i].cells[n + 3].querySelector("label").innerHTML == player2Color) {
                                winner("Player2");
                            } else { n = n + 3; }
                        } else { n = n + 2; }
                    } else { n = n + 1; }
                }
            }

        }
    }

    // check if there is a win in vertical direction
    for (let i = 0; i < column; i++) {
        for (let n = 0; n < row - 3; n++) {
            // for less computing time start with next iteration after last failed cell
            // player 1 detection
            if (isPlayer1Active) {
                if (document.getElementById("gameTable").rows[n].cells[i].querySelector("label").innerHTML == player1Color) {
                    if (document.getElementById("gameTable").rows[n + 1].cells[i].querySelector("label").innerHTML == player1Color) {
                        if (document.getElementById("gameTable").rows[n + 2].cells[i].querySelector("label").innerHTML == player1Color) {
                            if (document.getElementById("gameTable").rows[n + 3].cells[i].querySelector("label").innerHTML == player1Color) {
                                winner("Player1");
                            } else { n = n + 3; }
                        } else { n = n + 2; }
                    } else { n = n + 1; }
                }
                // player 2 detection
            } else {
                if (document.getElementById("gameTable").rows[n].cells[i].querySelector("label").innerHTML == player2Color) {
                    if (document.getElementById("gameTable").rows[n + 1].cells[i].querySelector("label").innerHTML == player2Color) {
                        if (document.getElementById("gameTable").rows[n + 2].cells[i].querySelector("label").innerHTML == player2Color) {
                            if (document.getElementById("gameTable").rows[n + 3].cells[i].querySelector("label").innerHTML == player2Color) {
                                winner("Player2");
                            } else { n = n + 3; }
                        } else { n = n + 2; }
                    } else { n = n + 1; }
                }
            }

        }
    }

    //diagonal from top left to bottom right
    // start with column 0 and alter through rows
    for (let i = 0; i < row - 3; i++) {
        for (let n = 0; n < column - 3; n++) {
            if (isPlayer1Active) {
                if (document.getElementById("gameTable").rows[i].cells[n].querySelector("label").innerHTML == player1Color) {
                    if (document.getElementById("gameTable").rows[i + 1].cells[n + 1].querySelector("label").innerHTML == player1Color) {
                        if (document.getElementById("gameTable").rows[i + 2].cells[n + 2].querySelector("label").innerHTML == player1Color) {
                            if (document.getElementById("gameTable").rows[i + 3].cells[n + 3].querySelector("label").innerHTML == player1Color) {
                                winner("Player1");
                            }
                        }
                    }
                }
            } else {
                if (document.getElementById("gameTable").rows[i].cells[n].querySelector("label").innerHTML == player2Color) {
                    if (document.getElementById("gameTable").rows[i + 1].cells[n + 1].querySelector("label").innerHTML == player2Color) {
                        if (document.getElementById("gameTable").rows[i + 2].cells[n + 2].querySelector("label").innerHTML == player2Color) {
                            if (document.getElementById("gameTable").rows[i + 3].cells[n + 3].querySelector("label").innerHTML == player2Color) {
                                winner("Player2");
                            }
                        }
                    }
                }
            }
        }

    }
    // start with row 0 and alter through column
    for (let i = 0; i < column - 3; i++) {
        for (let n = 0; n < row - 3; n++) {
            if (isPlayer1Active) {
                if (document.getElementById("gameTable").rows[n].cells[i].querySelector("label").innerHTML == player1Color) {
                    if (document.getElementById("gameTable").rows[n + 1].cells[i + 1].querySelector("label").innerHTML == player1Color) {
                        if (document.getElementById("gameTable").rows[n + 2].cells[i + 2].querySelector("label").innerHTML == player1Color) {
                            if (document.getElementById("gameTable").rows[n + 3].cells[i + 3].querySelector("label").innerHTML == player1Color) {
                                winner("Player1");
                            }
                        }
                    }
                }
            } else {
                if (document.getElementById("gameTable").rows[n].cells[i].querySelector("label").innerHTML == player2Color) {
                    if (document.getElementById("gameTable").rows[n + 1].cells[i + 1].querySelector("label").innerHTML == player2Color) {
                        if (document.getElementById("gameTable").rows[n + 2].cells[i + 2].querySelector("label").innerHTML == player2Color) {
                            if (document.getElementById("gameTable").rows[n + 3].cells[i + 3].querySelector("label").innerHTML == player2Color) {
                                winner("Player2");
                            }
                        }
                    }
                }
            }
        }
    }

    // diagonal from bottom left to top right
    // start with last column, alter through rows
    for (let i = 0; i < row - 3; i++) {
        for (let n = column - 1; n > 2; n--) {
            if (isPlayer1Active) {
                if (document.getElementById("gameTable").rows[i].cells[n].querySelector("label").innerHTML == player1Color) {
                    if (document.getElementById("gameTable").rows[i + 1].cells[n - 1].querySelector("label").innerHTML == player1Color) {
                        if (document.getElementById("gameTable").rows[i + 2].cells[n - 2].querySelector("label").innerHTML == player1Color) {
                            if (document.getElementById("gameTable").rows[i + 3].cells[n - 3].querySelector("label").innerHTML == player1Color) {
                                winner("Player1");
                            }
                        }
                    }
                }
            } else {
                if (document.getElementById("gameTable").rows[i].cells[n].querySelector("label").innerHTML == player2Color) {
                    if (document.getElementById("gameTable").rows[i + 1].cells[n - 1].querySelector("label").innerHTML == player2Color) {
                        if (document.getElementById("gameTable").rows[i + 2].cells[n - 2].querySelector("label").innerHTML == player2Color) {
                            if (document.getElementById("gameTable").rows[i + 3].cells[n - 3].querySelector("label").innerHTML == player2Color) {
                                winner("Player2");
                            }
                        }
                    }
                }
            }
        }
    }

    // start with first row, alter through column
    for (let i = column - 1; i > 2; i--) {
        for (let n = 0; n < row - 3; n++) {
            if (isPlayer1Active) {
                if (document.getElementById("gameTable").rows[n].cells[i].querySelector("label").innerHTML == player1Color) {
                    if (document.getElementById("gameTable").rows[n + 1].cells[i - 1].querySelector("label").innerHTML == player1Color) {
                        if (document.getElementById("gameTable").rows[n + 2].cells[i - 2].querySelector("label").innerHTML == player1Color) {
                            if (document.getElementById("gameTable").rows[n + 3].cells[i - 3].querySelector("label").innerHTML == player1Color) {
                                winner("Player1");
                            }
                        }
                    }
                }
            } else {
                if (document.getElementById("gameTable").rows[n].cells[i].querySelector("label").innerHTML == player2Color) {
                    if (document.getElementById("gameTable").rows[n + 1].cells[i - 1].querySelector("label").innerHTML == player2Color) {
                        if (document.getElementById("gameTable").rows[n + 2].cells[i - 2].querySelector("label").innerHTML == player2Color) {
                            if (document.getElementById("gameTable").rows[n + 3].cells[i - 3].querySelector("label").innerHTML == player2Color) {
                                winner("Player2");
                            }
                        }
                    }
                }
            }
        }
    }
}

function winner(player) {
    gameActive = false;
    alert("Player " + player + " has won!");
}

// random assignment of colors and starting player
function setPlayerColor() {
    const random = Math.floor(Math.random() * 4);
    if (random == 0) {
        isPlayer1Active = true;
        player1Color = "red";
        player2Color = "yellow";
    } else if (random == 1) {
        isPlayer1Active = false;
        player1Color = "red";
        player2Color = "yellow";
    } else if (random == 2) {
        isPlayer1Active = true;
        player1Color = "yellow";
        player2Color = "red";
    } else {
        isPlayer1Active = false;
        player1Color = "yellow";
        player2Color = "red";
    }
    document.getElementById("player1Img").src = player1Color + ".png";
    document.getElementById("player2Img").src = player2Color + ".png";
    changeActivePlayer();
}

function changeActivePlayer() {
    if (isPlayer1Active) {
        document.getElementById("player1Label").setAttribute("style", "color: green");
        document.getElementById("player2Label").setAttribute("style", "color: white");
    } else {
        document.getElementById("player2Label").setAttribute("style", "color: green");
        document.getElementById("player1Label").setAttribute("style", "color: white");
    }
}
