var controlDiv = document.getElementById('controlDiv')
var minesInput = document.getElementById('minesInput')
var rowsInput = document.getElementById('rowsInput')
var columnsInput = document.getElementById('columnsInput')
var difficulty = "none";
var interval = 0
var winDiv = document.getElementById('winDiv')
var loseDiv = document.getElementById('loseDiv')
var mines = 0
var winPoints = 0
var flagsRemain = 0
var rek = 0
var clal = 0
var flagsElement = document.getElementById('flagsElement')
var input = 0;
var customRows = 0;
var customColumns = 0;
var customMines = 0;
var useInputs = true;
var currentTime = 000;
var spanDifficulty = document.getElementById('spanDifficulty')
var spanDifficultyLose = document.getElementById('spanDifficultyLose')
var settingsDiv = document.getElementById("settingsDiv")
function openSettings() {
  settingsDiv.style.display = "initial"
}
function closeSettings() {
  settingsDiv.style.display = "none"
}
var styleSheet = document.getElementById('styleLink');
var backColor = null;
var cellColor = null;
window.addEventListener('orientationchange', changeOrientation)
window.onresize = function(){changeOrientation()}
function changeColor(type) {
  if (type == "orange") {
    styleSheet.href = "./Resources/Stylesheets/orange.css";
  } else if (type == "red") {
    styleSheet.href = "./Resources/Stylesheets/red.css";
  } else if (type == "green") {
    styleSheet.href = "./Resources/Stylesheets/green.css";
  } else if (type == "blue") {
    styleSheet.href = "./Resources/Stylesheets/blue.css";
  } else if (type == "yellow") {
    styleSheet.href = "./Resources/Stylesheets/yellow.css";
  } else if (type == "purple") {
    styleSheet.href = "./Resources/Stylesheets/purple.css";
  }
}
function changeOrientation() {
    var height = window.innerHeight;
    var width = window.innerWidth;
    if (width > height) {
        var tds = document.getElementsByTagName('td')
        var correctSize = (width)/rek;
        console.log('Landscape | Correct Size: ' + correctSize)
        for (var t = 0; t < tds.length; t++) {
            tds[t].style.height = correctSize;
            tds[t].style.width = correctSize;
        }
    } else if (width < height) {
        var tds = document.getElementsByTagName('td')
        var correctSize = (height-85)/rek;
        console.log('Portrait | Correct Size: ' + correctSize)
        for (var t = 0; t < tds.length; t++) {
            tds[t].style.height = correctSize;
            tds[t].style.width = correctSize;
        }
    }
}
function playBoardAgain(type) {
    var table = document.getElementsByTagName('table')[0]
    var rows = table.children
    for (var i = 0; i < rek; i++) {
        for (var x = 0; x < clal; x++) {
            rows[i].children[x].className = "covered"
            rows[i].children[x].innerHTML = ""
            rows[i].children[x].onmousedown = function(){showCell(this, event)}
            if (tableArray[i][x] == "/") {
                tableArray[i][x] = "0"
            }
        }
    }
    var div = document.getElementById(type + "Div")
    div.style.height = "0px";
    div.style.display = "none";
    div.style.zIndex = "-4";
    flagsElement.innerHTML = parseFloat(mines);
    flagsRemain = parseFloat(mines);
    currentTime = "-1"
    timerUp();
    interval = setInterval(timerUp, 1000)
    useInputs = false;
}

function timerUp() {
    currentTime = parseFloat(currentTime)
    currentTime = currentTime + 1;
    if (currentTime < 10) {
        currentTime = "0" + currentTime
    }
    if (currentTime < 100) {
        currentTime = "0" + currentTime
    }
    timerElement.innerHTML = currentTime
}


function playAgain(kind) {
    returnToNormal()
    decideNumber(difficulty)
    var div = document.getElementById(kind + "Div")
    div.style.height = "0px";
    div.style.display = "none";
    div.style.zIndex = "-4"
    useInputs = false;
}

function backToStart(kind) {
    returnToNormal()
    controlDiv.style.display = "initial";
    controlDiv.style.zIndex = "2";
    var div = document.getElementById(kind + "Div")
    div.style.height = "0px";
    div.style.display = "none";
    div.style.zIndex = "-4"
    useInputs = true;
}
function returnToNormal() {
    document.getElementsByTagName('table')[0].parentElement.removeChild(document.getElementsByTagName('table')[0])
    tableArray = [

        ]
    bombArray = [

        ]
    console.clear()
    flagsElement.style.display = "none"
    timerElement.style.display = "none"
}




function winGame() {
    winDiv.style.display = "initial";
        winDiv.style.zIndex = "2"
        winDiv.style.height = "250px";
    var captital = difficulty.substring(0, 1).toUpperCase() + difficulty.substring(1);
    spanDifficulty.innerHTML = captital + "!";
    spanDifficulty.parentElement.className = difficulty;
        var td = document.getElementsByTagName('td')
        for (var t = 0; t < td.length; t++) {
            td[t].onmousedown = ""
        }
    clearInterval(interval);
    currentTime = 000;
}


function endGame() {
    for (var b = 0; b < bombArray.length; b++) {
        var row = bombArray[b][0]
        var column = bombArray[b][1]
        var id = row + " - " + column
        var bomb = document.getElementById(id)
        if (bomb.className.search("uncovered") == -1) {
            bomb.innerHTML = "&#128163;"
        } else {
            var explodedCell = row + " - " + column
        }
    }
    var cells = document.getElementsByTagName('td')
    for (var c = 0; c < cells.length; c++) {
        cells[c].onmousedown = ""
    }
    document.getElementById(explodedCell).className = "exploded"
    loseDiv.style.height = "250px";
    loseDiv.style.display = "initial";
    loseDiv.style.zIndex = "2"
    var captital = difficulty.substring(0, 1).toUpperCase() + difficulty.substring(1);
    spanDifficultyLose.innerHTML = captital + ".";
    clearInterval(interval);
    currentTime = 000;
    for (var i = 0; i < rek; i++) {
        for (var x = 0; x < clal; x++) {
            var table = document.getElementsByTagName('table')[0]
            var cell = table.children[i].children[x]
            if (cell.innerHTML == "&#128681;" || cell.innerHTML == "🚩") {
                cell.className = "failFlag"
            }
        }
    }
}

var bombArray = [

]

function showCell(x, event) {
    var r = x.id.substr(0, 2)
    var c = x.id.substr(5, 2)

    if (r.charAt(0) == "0") {
        r = r.substr(1,1)
    }
    if (c.charAt(0) == "0") {
        c = c.substr(1,1)
    }

    if (event.button == 0) {
        if (x.className.search("flag") == -1) {
    var actualNumber = tableArray[r][c]
    if (actualNumber != "B" && actualNumber != "0" && actualNumber != "/") {
        x.innerHTML = actualNumber
        x.className = "uncovered"
        x.className = x.className + " _" + actualNumber
    } else if (actualNumber == "B") {
        x.innerHTML = "&#128165;"
        x.className = "uncovered"
        endGame()
    } else if (actualNumber == "0" || actualNumber == "/") {
        var rmax = tableArray.length
        var cmax = tableArray[0].length
        var ar = parseFloat(r)
        var ac = parseFloat(c)
        checkForNil(ar, ac)
        var hasGone = 0;
        function checkForNil(r, c) {
        var top = r-1
        var bottom = r+1
        var left = c-1
        var right = c+1
            if (top >= 0 && left >= 0) {
                if (tableArray[top][left] == "0") {
                    var input = [top, left]
            emptyArray.push(input)
            tableArray[top][left] = "/"
            }
            }

            if (top >= 0) {
            if (tableArray[top][c] == "0") {
            var input = [top, c]
            emptyArray.push(input)
            tableArray[top][c] = "/"
            }
            }
            if (top >=0 && right < cmax) {
            if (tableArray[top][right] == "0") {
            var input = [top, right]
            emptyArray.push(input)
            tableArray[top][right] = "/"
            }
            }
            if (left >= 0) {
        if (tableArray[r][left] == "0") {
            var input = [r, left]
            emptyArray.push(input)
            tableArray[r][left] = "/"
        }
        }
            if (right < cmax) {
        if (tableArray[r][right] == "0") {
            var input = [r, right]
            emptyArray.push(input)
            tableArray[r][right] = "/"
        }
        }
            if (bottom < rmax && left >= 0) {
        if (tableArray[bottom][left] == "0") {
            var input = [bottom, left]
            emptyArray.push(input)
            tableArray[bottom][left] = "/"
        }
        }
            if (bottom < rmax) {
        if (tableArray[bottom][c] == "0") {
            var input = [bottom, c]
            emptyArray.push(input)
            tableArray[bottom][c] = "/"
        }
        }
          if (bottom < rmax && right < cmax) {
        if (tableArray[bottom][right] == "0") {
            var input = [bottom, right]
            emptyArray.push(input)
            tableArray[bottom][right] = "/"
        }
        }
            var atop = top
            var abottom = bottom
            var aright = right
            var aleft = left
            var ar = r
            var ac = c
            if (top.toString().length == 1) {
                top = "0" + top
            } else {
                top = top.toString()
            }

            if (bottom.toString().length == 1) {
                bottom = "0" + bottom
            } else {
                bottom = bottom.toString()
            }

            if (right.toString().length == 1) {
                right = "0" + right
            } else {
                right = right.toString()
            }

            if (left.toString().length == 1) {
                left = "0" + left
            } else {
                left = left.toString()
            }

            if (r.toString().length == 1) {
                r = "0" + r
            } else {
                r = r.toString()
            }

            if (c.toString().length == 1) {
                c = "0" + c
            } else {
                c = c.toString()
            }
            if (top >= 0 && left >= 0) {
        var y = document.getElementById(top + " - " + left)
        y.className="uncovered"
        if (tableArray[atop][aleft] != "0" && tableArray[atop][aleft] != "/") {
            y.innerHTML = tableArray[atop][aleft]
            y.className = y.className + " _" + tableArray[atop][aleft]
        }
            } if (top >= 0) {
        var y = document.getElementById(top + " - " + c)
        y.className="uncovered"
        if (tableArray[atop][ac] != "0" && tableArray[atop][ac] != "/") {
            y.innerHTML = tableArray[atop][ac]
            y.className = y.className + " _" + tableArray[atop][ac]
        }
            } if (top >=0 && right < cmax) {
        var y = document.getElementById(top + " - " + right)
        y.className="uncovered"
        if (tableArray[atop][aright] != "0" && tableArray[atop][aright] != "/") {
            y.innerHTML = tableArray[atop][aright]
            y.className = y.className + " _" + tableArray[atop][aright]
        }
            } if (left >= 0) {
        var y = document.getElementById(r + " - " + left)
        y.className="uncovered"
        if (tableArray[ar][aleft] != "0" && tableArray[ar][aleft] != "/") {
            y.innerHTML = tableArray[ar][aleft]
             y.className = y.className + " _" + tableArray[ar][aleft]
        }
            } if (right < cmax) {
        var y = document.getElementById(r + " - " + right)
        y.className="uncovered"
        if (tableArray[ar][aright] != "0" && tableArray[ar][aright] != "/") {
            y.innerHTML = tableArray[ar][aright]
            y.className = y.className + " _" + tableArray[ar][aright]
        }
            } if (bottom < rmax && left >= 0) {
        var y = document.getElementById(bottom + " - " + left)
        y.className="uncovered"
        if (tableArray[abottom][aleft] != "0" && tableArray[abottom][aleft] != "/") {
            y.innerHTML = tableArray[abottom][aleft]
            y.className = y.className + " _" + tableArray[abottom][aleft]
        }
            } if (bottom < rmax) {
                var y = document.getElementById(bottom + " - " + c)
        y.className="uncovered"
        if (tableArray[abottom][ac] != "0" && tableArray[abottom][ac] != "/") {
            y.innerHTML = tableArray[abottom][ac]
            y.className = y.className + " _" + tableArray[abottom][ac]
        }
            } if (bottom < rmax && right < cmax) {
                var y = document.getElementById(bottom + " - " + right)
        y.className="uncovered"
        if (tableArray[abottom][aright] != "0" && tableArray[abottom][aright] != "/") {
            y.innerHTML = tableArray[abottom][aright]
            y.className = y.className + " _" + tableArray[abottom][aright]
        }
            }
                document.getElementById(r + " - " + c).className="uncovered"
                var uncovered = document.getElementsByClassName('uncovered')
            console.log(emptyArray + " | " + left + " | " + right + " | " + top + " | " + bottom + " | " + r + " | " + c)

                if (emptyArray.length != 0 && hasGone > 0) {
                    emptyArray.shift()
                }
            hasGone = 1;
        }
        while (emptyArray.length > 0) {
            var aar = emptyArray[0][0]
            var aac = emptyArray[0][1]
            checkForNil(aar, aac)
        }
        hasGone = 0;
         x.className = "uncovered"
    }
    x.onmousedown = ""
        }
    } else if (event.button = 2) {
        if (x.className.search('uncovered') == -1) {
        if (x.className.search("flag") == -1) {
            if (flagsRemain > 0) {
                x.className = x.className + " flag"
                x.innerHTML = "&#128681;"
                flagsRemain = flagsRemain - 1
                flagsElement.innerHTML = flagsRemain
            }
        } else {
            var num = x.className.search("flag")
            x.className = x.className.replace(" flag", "")
            x.innerHTML = ""
            flagsRemain = flagsRemain + 1
            flagsElement.innerHTML = flagsRemain
        }
    }
    }
    if (((tableArray.length*tableArray[0].length)-mines) == document.getElementsByClassName('uncovered').length) {
    winGame()
    }
}
var emptyArray = []
function showForm() {
    var form = document.getElementsByTagName('form')[0]
    form.style.height = "120px"
    form.style.display = "initial"
}
function decideNumber(type) {
    controlDiv.style.display = "none";
    controlDiv.style.zIndex = "-4"
    if (type == "beginner") {
        mines = 15;
        flagsRemain = mines;
        var rowList = 10;
        var columnList = 10;
        difficulty = "beginner";
    }
    if (type == "intermediate") {
        mines = 40;
        flagsRemain = mines;
        var rowList = 15;
        var columnList = 15;
        difficulty = "intermediate";
    }
    if (type == "expert") {
        mines = 130;
        flagsRemain = mines;
        var rowList = 30;
        var columnList = 30;
        difficulty = "expert";
    }
    if (type == "custom") {
            mines = minesInput.value;
            flagsRemain = mines;
            var rowList = rowsInput.value;
            var columnList = columnsInput.value;

        difficulty = "custom"
    }
    flagsElement.style.display = "initial";
    timerElement.style.display = "initial";
    currentTime = -1;
    timerUp()
    interval = setInterval(timerUp, 1000)
    rek = rowList;
    clal = columnList;
    flagsElement.innerHTML = flagsRemain;
    var tab = document.createElement('table')
    for (var i = 0; i < rowList; i++) {
        var rowElement = document.createElement('tr')
        for (var t = 0; t < columnList; t++) {
            var columnElement = document.createElement('td')
            if (i < 10) {
                var ro = "0" + i
            } else {
                var ro = i
            }
            if (t < 10) {
                var col = "0" + t
            } else {
                var col = t
            }
            var string = ro + " - " + col
            columnElement.id = string
            columnElement.className = "covered"
            columnElement.onmousedown = function(){showCell(this, event)}
            columnElement.setAttribute("oncontextmenu", "return false;");
            rowElement.appendChild(columnElement)
        }
        tab.appendChild(rowElement)
        document.body.appendChild(tab)
    }
    for (var i = 0; i < rowList; i++) {
        var row = []
        tableArray.push(row)
        for (var y = 0; y < columnList; y++) {
            var column = []
            tableArray[i].push(column)
        }
    }
    theBigOne()
}
var tableArray = [

    ]
function theBigOne() {
    var cells = document.getElementsByTagName('td')
    var table = document.getElementsByTagName('table')[0]
var rows = table.children.length
var columns = table.children[0].children.length
for (var i = 0; i < mines; i++) {
    thingey()
    function thingey() {
    var randomRow = Math.floor((Math.random() * rows) + 1)
    var randomColumn = Math.floor((Math.random() * columns) + 1)
    if (tableArray[randomRow - 1][randomColumn - 1] != "B") {
    tableArray[randomRow - 1][randomColumn - 1] = "B"
    if (randomRow < 11) {
        var rr = "0" + (randomRow-1);
    } else {
        var rr = randomRow - 1
    }
    if (randomColumn < 11) {
        var rc = "0" + (randomColumn-1)
    } else {
        var rc = randomColumn - 1
    }
        var input = [rr, rc]
        bombArray.push(input)
    } else {
        thingey()
    }
    }
}
for (var r = 0; r < rows; r++) {
    for (var c = 0; c < columns; c++) {
        var currentCellValue = 0;
        var reason = "Reason: "
        if (tableArray[r][c] != "B") {

        if (r-1 >= 0 && c-1 >=0) {
        var tLeft = tableArray[r-1][c-1]
        }
        if (r-1 >=0) {
        var tMid = tableArray[r-1][c]
        }
        if (r-1 >= 0 && c+1 <= columns-1) {
        var tRight = tableArray[r-1][c+1]
        }

        if (c-1 >= 0) {
        var mLeft = tableArray[r][c-1]
        }
        if (c+1 <= columns-1) {
            var mRight = tableArray[r][c+1]
        }
            if (r+1 <= rows-1 && c-1 >= 0) {
                var bLeft = tableArray[r+1][c-1]
            }
            if (r+1 <= rows-1) {
                var bMid = tableArray[r+1][c]
            }
            if (r+1 <= rows-1 && c+1 <= columns-1) {
                var bRight = tableArray[r+1][c+1]
            }
        if (tLeft == "B") {
            currentCellValue = currentCellValue + 1
            reason = reason + "tLeft |"
        }
        if (tMid == "B") {
            currentCellValue = currentCellValue + 1
            reason = reason + "tMid |"
        }
        if (tRight == "B") {
            currentCellValue = currentCellValue + 1
            reason = reason + "tRight |"
        }
        if (mLeft == "B") {
            currentCellValue = currentCellValue + 1
            reason = reason + "mLeft |"
        }
        if (mRight == "B") {
            currentCellValue = currentCellValue + 1
            reason = reason + "mRight, "
        }
        if (bLeft == "B") {
            currentCellValue = currentCellValue + 1
            reason = reason + "bLeft, "
        }
        if (bMid == "B") {
            currentCellValue = currentCellValue + 1
            reason = reason + "bMid, "
        }
        if (bRight == "B") {
            currentCellValue = currentCellValue + 1
            reason = reason + "bRight, "
        }
            tableArray[r][c] = currentCellValue
        }
        tLeft = 0
        tMid = 0
        tRight = 0
        mLeft = 0
        mRight = 0
        bLeft = 0
        bMid = 0
        bRight = 0
    }
}
}
