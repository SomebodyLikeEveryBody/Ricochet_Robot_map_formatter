/*
 * N = obstacle Norh
 * S = Obstacle South
 * E = obstacle East
 * W = Obstacle West
 * 0 = nothing
 *
 * */

g_board = [
/*1*/       ['NW', 'NE', 'WN', 'NS', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'NE', 'WN', 'N', 'N', 'NE'],
/*2*/       ['W', '0', 'E', 'WN', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'E'],
/*3*/       ['W', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'ES', 'W', 'S', '0', 'E'],
/*4*/       ['W', '0', '0', '0', '0', '0', 'ES', 'W', '0', '0', '0', 'N', '0', 'NE', 'W', 'E'],
/*5*/       ['WE', 'WS', '0', '0', '0', '0', 'N', '0', '0', 'E', 'WS', '0', 'S', '0', '0', 'E'],
/*6*/       ['W', 'N', '0', '0', 'S', '0', '0', '0', '0', '0', 'N', 'E', 'NW', '0', '0', 'ES'],
/*7*/       ['WS', '0', '0', '0', 'NE', 'W', '0', 'S', 'S', '0', '0', '0', '0', '0', '0', 'EN'],
/*8*/       ['WN', '0', '0', '0', '0', '0', 'E', 'NW', 'NE', 'W', '0', '0', '0', '0', '0', 'E'],
/*9*/       ['W', 'S', '0', '0', '0', 'S', 'E', 'SW', 'SE', 'W', '0', '0', '0', '0', 'S', 'E'],
/*10*/      ['W', 'NE', 'W', '0', 'E', 'NW', '0', 'N', 'N', '0', '0', '0', '0', 'E', 'NW', 'E'],
/*11*/      ['WS', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'E', 'WS', '0', '0', '0', 'ES'],
/*12*/      ['WN', '0', '0', '0', '0', '0', '0', '0', '0', 'S', '0', 'N', '0', '0', '0', 'EN'],
/*13*/      ['W', '0', '0', '0', '0', '0', 'SE', 'W', '0', 'NE', 'W', '0', '0', '0', '0', 'E'],
/*14*/      ['W', '0', '0', '0', '0', '0', 'N', '0', '0', '0', '0', '0', '0', '0', '0', 'E'],
/*15*/      ['W', 'E', 'WS', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'ES', 'W', 'E'],
/*16*/      ['WS', 'S', 'SN', 'S', 'S', 'SE', 'SW', 'S', 'S', 'S', 'SE', 'SW', 'S', 'SN', 'S', 'SE'],
];


function beautiful () {
    let dirs = ['N', 'S', 'E', 'W'];
    let lRobots = ['blue', 'yellow', 'green', 'red', 'grey'];
    let dir = '';
    let robot = '';
    for (let i = 0; i < 1000; i++) {
        dir = dirs[Math.floor(Math.random() * dirs.length)];
        robot = lRobots[Math.floor(Math.random() * lRobots.length)];
        manager.moveRobot(robot, dir);
        console.log(dir);
    }
}

function aleat() {
    let dirs = ['N', 'S', 'E', 'W'];
    let lRobots = ['blue', 'yellow', 'green', 'red', 'grey'];
    let dir = '';
    let robot = '';
    for (let i = 0; i < 1000; i++) {
        dir = dirs[Math.floor(Math.random() * dirs.length)];
        robot = lRobots[Math.floor(Math.random() * lRobots.length)];
        manager.moveRobot(robot, dir);
        console.log(dir);
    }

}

/*
 *
 * */
function RobotManager(pBoardGame) {

    this.boardGame = pBoardGame;

    this.moveRobotTo = function (pRobotColor, pCoords) {
        let robotEl = $('#robot_' + pRobotColor);

        robotEl.slideUp(100, function () {
            robotEl.appendTo('td#coord_' + pCoords.y + '_' + pCoords.x);
        });

        robotEl.slideDown(100);
        this.boardGame.robots[pRobotColor] = pCoords;
    };

    this.robotHasWallAt = function (pRobotColor, pDir) {
        if($('td#coord_' + this.boardGame.robots[pRobotColor].y + '_' + this.boardGame.robots[pRobotColor].x).hasClass('cell_' + pDir)) {
            return (true);
        }

        return (false);
    }

    this.robotHasRobotAt = function (pRobotColor, pDir) {
        let coords = {};
        Object.assign(coords, this.boardGame.robots[pRobotColor]);

        switch (pDir) {
            case 'N':
                coords.y -= 1;
                break;
            case 'S':
                coords.y += 1;
                break;
            case 'E':
                coords.x += 1;
                break;
            case 'W':
                coords.x -= 1;
                break;
        }

        if (this.boardGame.boardChecker.checkCoords(coords) === true) {
            if ($('td#coord_' + coords.y + '_' + coords.x + ' div').length === 0) {
                return false;
            }
        }

        return true;
    };

    this.robotHasNoObstacleAt = function (pRobotColor, pDir) {
        if (this.robotHasWallAt(pRobotColor, pDir) || this.robotHasRobotAt(pRobotColor, pDir)) {
            return false;
        }

        return true;
    };

    this.moveRobot1North = function (pRobotColor) {
        this.moveRobotTo(pRobotColor, {x: this.boardGame.robots[pRobotColor].x, y: this.boardGame.robots[pRobotColor].y - 1});
    }

    this.moveRobot1South = function (pRobotColor) {
        this.moveRobotTo(pRobotColor, {x: this.boardGame.robots[pRobotColor].x, y: this.boardGame.robots[pRobotColor].y + 1});
    }

    this.moveRobot1East = function (pRobotColor) {
        this.moveRobotTo(pRobotColor, {x: this.boardGame.robots[pRobotColor].x + 1, y: this.boardGame.robots[pRobotColor].y});
    }

    this.moveRobot1West = function (pRobotColor) {
        this.moveRobotTo(pRobotColor, {x: this.boardGame.robots[pRobotColor].x - 1, y: this.boardGame.robots[pRobotColor].y});
    }

    this.moveRobotNorth = function (pRobotColor) {
        while (this.robotHasNoObstacleAt(pRobotColor, 'N')) {
            this.moveRobot1North(pRobotColor);
        }
    };

    this.moveRobotSouth = function (pRobotColor) {
        while (this.robotHasNoObstacleAt(pRobotColor, 'S')) {
            this.moveRobot1South(pRobotColor);
        }
    };

    this.moveRobotEast = function (pRobotColor) {
        while (this.robotHasNoObstacleAt(pRobotColor, 'E')) {
            this.moveRobot1East(pRobotColor);
        }
    };

    this.moveRobotWest = function (pRobotColor) {
        while (this.robotHasNoObstacleAt(pRobotColor, 'W')) {
            this.moveRobot1West(pRobotColor);
        }
    };

    this.moveRobot = function (pRobotColor, pDir) {
        switch (pDir) {
            case 'N':
                this.moveRobotNorth(pRobotColor);
                break;
            case 'S':
                this.moveRobotSouth(pRobotColor);
                break;
            case 'E':
                this.moveRobotEast(pRobotColor);
                break;
            case 'W':
                this.moveRobotWest(pRobotColor);
                break;
        }
    }
}

/*
 * BoardChecker:
 * ------------
 * Object which is able to check letters, wall patterns or whole boards to tell if they are correctly filled
 * Contains:
 * - this.coordsNotInArray(pCoords)
 * - this.isLetterWall(pLetter)
 * - this.checkLetter(pLetter)
 * - this.checkCellPattern(pStrPattern)
 * - this.checkCoords(pCoords)
 * - this.checkBoard(pBoard)
 *
 * */
function BoardChecker() {
    /*
     * this.notInArray(pCoords, pArrayCoords):
     * Takes as argument a coord pCoords {x: coordX, y: coordY}
     * and an object pArrayCoords that is kind of
     * {element1: {x: coordX, y: coordY}, element2: {x: coordX, y: coordY}, ..., elementN: {x: coordX, y: coordY}}
     * and check if no element of the object has the same coords as pCoords
     *
     * */
    this.coordsNotInArray = function (pCoords, pArrayCoords) {
        for (const tempCoords of pArrayCoords) {
            if (pCoords.x === tempCoords.x && pCoords.y === tempCoords.y) {
                return (false);
            }
        }

        return (true);
    };

    /*
     * this.isLetterWall(pLetter):
     * Checks if the letter is an authorized letter in a wall pattern (NSEW)
     *
     * */
    this.isLetterWall = function (pLetter) {
        if (['N', 'S', 'E', 'W'].indexOf(pLetter) === -1) {
            return (false);
        }

        return (true);
    };

    /*
     * this.checkLetter(pLetter):
     * Checks if the letter is an authorized letter for a cell pattern (NSEW0)
     *
     * */
    this.checkLetter = function (pLetter) {
        if (!(this.isLetterWall(pLetter) || pLetter === '0')) {
            return (false);
        }

        return (true);
    };

    /*
     * this.checkCellPattern(pStrPattern):
     * checks if a cell pattern is correct ('0' or a set composed by elements {'N', 'S', 'E', 'W'})
     *
     * */
    this.checkCellPattern = function (pStrPattern) {
        if (pStrPattern === '0') {
            return (true);
        } else {
            let arrayPattern = pStrPattern.split('');
            for (const pattern of arrayPattern) {
                if (this.isLetterWall(pattern) === false) {
                    return (false);
                }
            }

            return (true);
        }
    };

    /*
     * this.checkCoords(pCoords):
     * Checks if coords are ([0-16];[0-16]);
     *
     * */
    this.checkCoords = function (pCoords) {
        if (pCoords.x >= 0 && pCoords.x <= 15 && pCoords.y >= 0 && pCoords.y <= 15) {
            return (true);
        }

        return (false);
    };

    /*
     * this.patternHasWall(pStrPattern, pLetterWall):
     *
     * */
    this.patternHasWall = function (pStrPattern, pLetterWall) {
        return (pStrPattern.split('').indexOf(pLetterWall) !== -1);
    }

    /*
     * this.checkBoard(pBoard):
     * checks if board is correctly formatted, that means
     * - is an array [16][16]
     * - each element is String
     * - each element is length [1 ; 4]
     * - each element is a '0' or a set containing one or more elements from NSEW
     *
     * */
    this.checkBoard = function (pBoard) {
        if ((typeof (pBoard) !== typeof ([])) || (pBoard.length !== 16)) {
            return (false);
        }

        for (const lineArray of pBoard) {
            if (typeof (lineArray) !== typeof ([]) || (lineArray.length !== 16)) {
                return (false);
            }

            for (const cellStr of lineArray) {
                if (typeof(cellStr) !== typeof('42') || cellStr.length < 1 || cellStr.length > 4) {
                    return(false);
                }

                let elToSet = new Set(cellStr.split(''));
                let cellClassAttribute = '';
                for (const val of elToSet) {
                    if (this.checkLetter(val) === false) {
                        return (false);
                    }
                }
            }
        }

        return (true);
    };

    /*
     * Takes as argument a coord pCoords {x: coordX, y: coordY}
     * and an object pArrayCoords that is kind of
     * {element1: {x: coordX, y: coordY}, element2: {x: coordX, y: coordY}, ..., elementN: {x: coordX, y: coordY}}
     * and check if no element of the object has the coords pCoords
     *
     * */
    this.checkCoordsAreDistincts = function (pCoords, pArrayCoords) {
        let tempCoords = {};
        for (const key in pArrayCoords) {
            tempCoords = pArrayCoords[key]
            if (pCoords.x === tempCoords.x && pCoords.y === tempCoords.y) {
                return (false);
            }
        }

        return (true);
    };
}

function BoardGame(pBoard) {
    this.emptyMap = [
                        ['NW', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'NE'],
                        ['W', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'E'],
                        ['W', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'E'],
                        ['W', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'E'],
                        ['W', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'E'],
                        ['W', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'E'],
                        ['W', '0', '0', '0', '0', '0', '0', 'S', 'S', '0', '0', '0', '0', '0', '0', 'E'],
                        ['W', '0', '0', '0', '0', '0', 'E', 'NW', 'NE', 'W', '0', '0', '0', '0', '0', 'E'],
                        ['W', '0', '0', '0', '0', '0', 'E', 'SW', 'SE', 'W', '0', '0', '0', '0', '0', 'E'],
                        ['W', '0', '0', '0', '0', '0', '0', 'N', 'N', '0', '0', '0', '0', '0', '0', 'E'],
                        ['W', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'E'],
                        ['W', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'E'],
                        ['W', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'E'],
                        ['W', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'E'],
                        ['W', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'E'],
                        ['SW', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'SE'],
    ];

    this.robots = {
        blue: {x: 0, y: 6},
        red: {x: 0, y: 0},
        green: {x: 2, y: 6},
        yellow: {x: 9, y: 5},
        grey: {x: 4, y: 0},
    };

    this.mirrors = {
        blue: null,
        red: null,
        green: null,
        yellow: null,
        grey: null,
    };

    this.boardChecker = new BoardChecker();
    this.map = [];

    /*
     * this.defineMap():
     * initiate the BoardGameObject by affecting the map and drawing it on the board
     *
     * */
    this.defineMap = function () {
        if (!pBoard) {
            pBoard = this.emptyMap;
        }

        if (this.boardChecker.checkBoard(pBoard) === true) {
            this.map = pBoard;
        } else {
            this.map = [];
            console.log('ERROR: Map not well formated');
        }
    };

    /*
     * this.getCellClassesOfMap(pMap)
     * Parses pMap and returns an array[16][16] containing each css classes for each cell
     * */
    this.getCellClassesOfMap = function (pMap) {
        let retClassesArray = [];
        let lineArray = [];
        let tempElToSet = null;
        let tempcellClassAttribute = null;

        for (const lineIndex in this.map) {
            lineArray = pMap[lineIndex];
            retClassesArray.push([]);

            for (cellStr of lineArray) {
                tempElToSet = new Set(cellStr.split(''));
                tempCellClassAttribute = '';

                for (val of tempElToSet) {
                    tempCellClassAttribute += " cell_" + val;
                }

                retClassesArray[lineIndex].push(tempCellClassAttribute);
            }
        }

        return (retClassesArray);
    }

    /*
     * this.drawGrid(pBoard):
     * Takes an array that discribes the board and appends the correspondings <td>s to the table#board
     * */
    this.drawGrid = function (pBoard) {
        let cellClasses = this.getCellClassesOfMap(this.map);
        //for (let coordY = 0; coordY < pBoard.length; coordY++) {
        for (const coordY in pBoard) {
            $('table#board').append($('<tr id="line_' + coordY + '"></tr>'));
            for (const coordX in pBoard[coordY]) {
                $('tr#line_' + coordY).append($('<td class="cell' + cellClasses[coordY][coordX] + '" id="coord_' + coordY + '_' + coordX + '" title="(' + (parseInt(coordX) + 1) + ';' + (parseInt(coordY) + 1) + ')"></td>'));
            }
        }
    };

    /*
     * this.addWallToCell(pCellCoords, pLetterWall):
     * adds a wall to a precise cell if the cell doesn't have it already,
     * and then update the display in the web page
     * */
    this.addWallToCell = function (pCellCoords, pLetterWall) {
        if (this.boardChecker.isLetterWall(pLetterWall) === true && this.boardChecker.checkCoords(pCellCoords) === true) {
            if (this.map[pCellCoords.y][pCellCoords.x] === '0') {
                this.map[pCellCoords.y][pCellCoords.x] = '';
            }

            let configPattern = this.map[pCellCoords.y][pCellCoords.x].split('');

            if (!(this.boardChecker.patternHasWall(this.map[pCellCoords.y][pCellCoords.x], pLetterWall))) {
                this.map[pCellCoords.y][pCellCoords.x] += pLetterWall;
                this.updateCellDisplay(pCellCoords);
            };
        }
    };

    /*
     * this.removeWallToCell(pCellCoords, pLetterWall):
     * removes a wall to a precise cell if the cell have it
     * and then update the display in the web page
     * */
    this.removeWallToCell = function (pCellCoords, pLetterWall) {
        if (this.boardChecker.isLetterWall(pLetterWall) === true && this.boardChecker.checkCoords(pCellCoords) === true) {
            if (this.boardChecker.patternHasWall(this.map[pCellCoords.y][pCellCoords.x], pLetterWall)) {
                this.map[pCellCoords.y][pCellCoords.x] = this.map[pCellCoords.y][pCellCoords.x].split('').filter((letter) => (letter != pLetterWall)).join('');

                if (this.map[pCellCoords.y][pCellCoords.x] === '') {
                    this.map[pCellCoords.y][pCellCoords.x] = '0';
                }

                this.updateCellDisplay(pCellCoords);
            }
        }
    };

    /*
     * this.removeComplementaryWallsOf(pCoords):
     * Removes all walls of the otherside of the cell,
     * */
    this.removeComplementaryWallsOf = function (pCoords) {
        this.removeWallToCell({x: pCoords.x, y: (pCoords.y - 1)}, 'S');
        this.removeWallToCell({x: pCoords.x, y: (pCoords.y + 1)}, 'N');
        this.removeWallToCell({x: (pCoords.x - 1), y: pCoords.y}, 'E');
        this.removeWallToCell({x: (pCoords.x + 1), y: pCoords.y}, 'W');
    };

    this.addComplementaryWallOf = function (pCoords, pLetterWall) {
        if (this.boardChecker.isLetterWall(pLetterWall) === true) {
            switch (pLetterWall) {
                case 'N':
                    this.addWallToCell({x: pCoords.x, y: pCoords.y - 1}, 'S');
                    break;
                case 'S':
                    this.addWallToCell({x: pCoords.x, y: pCoords.y + 1}, 'N');
                    break;
                case 'E':
                    this.addWallToCell({x: pCoords.x + 1, y: pCoords.y}, 'W');
                    break;
                case 'W':
                    this.addWallToCell({x: pCoords.x - 1, y: pCoords.y}, 'E');
                    break;
                case '0':
                    this.removeComplementaryWallsOf(pCoords);
                    break;
            }
        }
    };

    /* this.updateCellDisplay(pCoords):
     *
     * */
    this.updateCellDisplay = function (pCoords) {
        let tdCellElement = $('td#coord_' + pCoords.y + '_' + pCoords.x);
        let walls = this.map[pCoords.y][pCoords.x].split('');

        tdCellElement.attr('class', '').addClass('cell');
            for (const wallIndex in walls) {
                tempWall = walls[wallIndex];

            if (this.boardChecker.checkLetter(tempWall) === true) {
                tdCellElement.addClass('cell_' + tempWall);
            }
        }
    };

    /* this.addBorderWallsTo(pCoords):
     * Checks if the cell is at the first/last line/column and if it is,
     * adds the corresponding border wall.
     * */
    this.addBorderWallsTo = function (pCoords) {
        switch (pCoords.y) {
            case 0:
                this.addWallToCell(pCoords, 'N');
                break;
            case 15:
                this.addWallToCell(pCoords, 'S');
                break;
        }

        switch (pCoords.x) {
            case 0:
                this.addWallToCell(pCoords, 'W');
                break;
            case 15:
                this.addWallToCell(pCoords, 'E');
                break;
        }
    }

    /* this.setCellPattern(pCoords):
     *
     * */
    this.setCellPattern = function (pCoords, pLettersPattern) {
        if (this.boardChecker.checkCellPattern(pLettersPattern) === true) {
            let walls = pLettersPattern.split('');

            this.map[pCoords.y][pCoords.x] = '';
            this.removeComplementaryWallsOf(pCoords);
            for (const tempWall of walls) {
                this.addWallToCell(pCoords, tempWall);
                this.addComplementaryWallOf(pCoords, tempWall);
            }

            this.addBorderWallsTo(pCoords)
            this.updateCellDisplay(pCoords);
        }
    };

    /*
     * this.rand():
     * Returns a random number between pMin and pMax included
     * */
    this.rand = function (pMin, pMax) {
        return (Math.floor((Math.random() * pMax) + pMin));
    };

    /*
     * Generate random coords to place robots randomly
     *
     * The function ensures that each robot is not placed at the same place of
     * another robot NEITHER in the coords {x from [7,8], y from [7,8]}
     * So at first, it sets all robots coords of g_config at at null to permit an
     * efficient comparison
     *
     * */
    this.randomPlaceRobots = function (pArrayRobotsCoords) {
        let tempCoords = {}

        for (robot in pArrayRobotsCoords) {
            pArrayRobotsCoords[robot] = {x: null, y: null}
        }

        for (robot in pArrayRobotsCoords) {
            tempCoords = {x: this.rand(0, 15), y: this.rand(0, 15)}

            while (((tempCoords.x >= 7 && tempCoords.x <= 8) && (tempCoords.y >= 7 && tempCoords.y <=8))
                || (this.boardChecker.checkCoordsAreDistincts(tempCoords, pArrayRobotsCoords) === false)) {

                tempCoords = {x: this.rand(0, 15), y: this.rand(0, 15)}
            }

            pArrayRobotsCoords[robot] = tempCoords;
            $('#robot_' + robot).appendTo($('#coord_' + tempCoords.y + '_' + tempCoords.x)).show(700);
        }
    };

    this.placeRobots = function () {
        for (robotColor in this.robots) {
            $('#robot_' + robotColor).appendTo($('#coord_' + this.robots[robotColor].y + '_' + this.robots[robotColor].x)).show(700);
        }
    };

    /*
     * Generate random coords to place robots randomly
     *
     * The function ensures that each robot is not placed at the same place of
     * another robot NEITHER in the coords {x from [7,8], y from [7,8]}
     * So at first, it sets all robots coords of g_config at at null to permit an
     * efficient comparison
     *
     * */
    this.moveRobotTo = function (pRobotEl, pCoords) {
        if (this.boardChecker.checkCoordsAreDistincts(pCoords, this.robots)) {
            pRobotEl.hide(100, function () {
                $('td#coord_' + pCoords.y+ '_' + pCoords.x).append(pRobotEl);
                pRobotEl.show(100);
            });
        }
    };


    this.defineMap();
}

function KeyboardListener() {
    this.doWhenIsPressed = function (pKey) {
        switch(pKey) {
            //escape
            case 27:
                $('#choose_cell').hide(200, function () {
                    $('#control_panel').fadeIn(200);
                });

                break;
            //left arrow
            case 37:
                $('#chooseboxW').click();
                break;
                //up arrow
            case 38:
                $('#chooseboxN').click();
                break;
            //right arrow
            case 39:
                $('#chooseboxE').click();
                break;
            //down arrow
            case 40:
                $('#chooseboxS').click();
                break;
            //shift
            case 16:
                $('#choosebox0').click();
                break;
            //Q
            case 81:
                $('#chooseboxNW').click();
                break;
            //A
            case 65:
                $('#chooseboxWS').click();
                break;
            //S
            case 83:
                $('#chooseboxSE').click();
                break;
            //W
            case 87:
                $('#chooseboxEN').click();
                break;
            //B
            case 66:
                $('#robot_blue_choosebox').click();
                break;
            //R
            case 82:
                $('#robot_red_choosebox').click();
                break;
            //G
            case 71:
                $('#robot_green_choosebox').click();
                break;
            //Y
            case 89:
                $('#robot_yellow_choosebox').click();
                break;
            //D
            case 68:
                $('#robot_grey_choosebox').click();
                break;
            default:
                console.log(pKey);
        }
    };

    this.activate = function () {
        let that = this;
        $(document).keydown(function (e) {
            if ($('#choose_cell').is(':visible')) {
                that.doWhenIsPressed(e.which);
            }
        });
    }
}

function switchSettingsScreen(pTargetEl) {
    let splittedId = pTargetEl.id.split('_');
    let cellCoordY = splittedId[1];
    let cellCoordX = splittedId[2];

    $('#asking strong').text('(' + (parseInt(cellCoordX) + 1) + ';' + (parseInt(cellCoordY) + 1) + ')');
}

function translateCellCode(pCode) {

}

function updateFormatCode(pMap) {
    textAreaEl = $('textarea#format_code');
    textAreaEl.val('');

    for (lineArray of pMap) {
        for (cellValue of lineArray) {
            textAreaEl.val(textAreaEl.val() + cellValue);
        }

        textAreaEl.val(textAreaEl.val() + '\n');
    }
}

/*
 * MAIN
 * */
$(function () {
    let boardGame = new BoardGame(g_board);
    let keyboardListener = new KeyboardListener();

    $('#choose_cell, .robot, #format_code').hide(0);
    boardGame.drawGrid(boardGame.map);
    boardGame.randomPlaceRobots(boardGame.robots);
    keyboardListener.activate();
    $('#welcome_screen').fadeOut(500);

    $('.cell').click(function (e) {
        $('#choose_cell').hide(100);
        $('#control_panel').hide(100);
        switchSettingsScreen(e.currentTarget);
        $('#choose_cell').show(200);
        updateFormatCode(boardGame.map);
    });

    $('.cell_choosebox, .robot_choosebox, .mirror_choosebox').click(function (e) {
        let element = $(e.currentTarget);

        element.fadeOut(100);
        element.fadeIn(100);
    });

    $('.robot_choosebox').click(function (e) {
        let cellCoordsGot = $('#asking strong').text().slice(1, -1).split(';');
        let cellCoords = {x: (parseInt(cellCoordsGot[0]) - 1), y: (parseInt(cellCoordsGot[1]) - 1)};
        let tdCellElement = $('td#coord_' + cellCoords.y + '_' + cellCoords.x);
        let robotDivElement = $('#' + e.currentTarget.id.split('_choosebox')[0]);
        let robotColor = robotDivElement.attr('id').split('robot_')[1];

        if (boardGame.boardChecker.checkCoordsAreDistincts(cellCoords, boardGame.robots)) {
            boardGame.moveRobotTo(robotDivElement, cellCoords);
            boardGame.robots[robotColor] = cellCoords;
        }
    });

    $('.cell_choosebox').click(function (e) {
        let cellCoordsGot = $('#asking strong').text().slice(1, -1).split(';');
        let cellCoords = {x: (parseInt(cellCoordsGot[0]) - 1), y: (parseInt(cellCoordsGot[1]) - 1)};
        let walls = e.currentTarget.id.split('choosebox')[1];

        boardGame.setCellPattern(cellCoords, walls);
    });

    $('td.cell').mouseenter(function (e) {
        if ($('#choose_cell').is(':visible')) {
            let settingsCellCoordsGot = $('#asking strong').text().slice(1, -1).split(';');
            let settingsCellCoords = {x: (parseInt(settingsCellCoordsGot[0]) - 1), y: (parseInt(settingsCellCoordsGot[1]) - 1)};
            let tdCoordsGot = $(e.currentTarget).attr('id').split('_');
            let tdCoords = {x: parseInt(tdCoordsGot[2]), y: parseInt(tdCoordsGot[1])};

            if (tdCoords.x !== settingsCellCoords.x || tdCoords.y !== settingsCellCoords.y) {
                switchSettingsScreen(e.currentTarget);
            }
        }
    });

    $('#show_format_code').click(function () {
        updateFormatCode(boardGame.map);
        textAreaEl.slideToggle(200).select();
    });

    manager = new RobotManager(boardGame);
    beautiful();
});
