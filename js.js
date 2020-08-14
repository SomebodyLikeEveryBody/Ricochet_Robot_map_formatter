/*
 * N = obstacle Norh
 * S = Obstacle South
 * E = obstacle East
 * W = Obstacle West
 * 0 = nothing
 *
 * */

g_defaultBoard = [
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


 /*
 * MapCodeDisplayer:
 * ------------
 * Object that manages the translation and display of the map code in the textarea,
 * so that the user can copy it to go to Kevin Cox's website
 * 
 * Thanks to Kevin Cox for implementing this.getBoardMetaDatas() and this.encodeBoardMetaDatas() methods
 *
 * Contains:
 * - this.getFormatCode()
 * - this.updateFormatCode()
 * - this.translateCellCode(pCode)
 * - this.getBoardMetaDatas(pFormatCode)
 * - this.encodeBoardMetaDatas(pBoardMetaDatas)
 * - this.getMapUrlCode()
 *
 * */
function MapCodeDisplayer(pBoardGame) {
    this.boardGame = pBoardGame;

    /*
     * returns the formated code shown in the textarea
     * */
    this.getFormatCode = function () {
        return ($('textarea#format_code').val());
    }

    /*
     * Parse the map, generate the code compatible with Kevin Cox's website and display it
     * in textarea#format_code
     * */
    this.updateFormatCode = function () {
        let textValue = 'board 16 16\n';

        for (lineArray of this.boardGame.map) {
            for (cellValue of lineArray) {
                textValue += this.translateCellCode(cellValue) + ' ';
            }

            textValue = textValue.trim() + '\n';
        }

        textValue += 'mirrors 0\nrobots 5\n'
            + this.boardGame.robots.grey.x + ' ' + this.boardGame.robots.grey.y + '\n'
            + this.boardGame.robots.red.x + ' ' + this.boardGame.robots.red.y + '\n'
            + this.boardGame.robots.green.x + ' ' + this.boardGame.robots.green.y + '\n'
            + this.boardGame.robots.yellow.x + ' ' + this.boardGame.robots.yellow.y + '\n'
            + this.boardGame.robots.blue.x + ' ' + this.boardGame.robots.blue.y + '\ntarget 0 13 12 2';

        $('textarea#format_code').val(textValue);
    }

    /*
     * Take a cellCode like 'EWS' or 'E' or 'W' or 'NWES' etc
     * and return the cellCode compatible with Kevin Cox's website ('C' or 'N' or 'W' or 'B')
     * */
    this.translateCellCode = function (pCode) {
        ret_code = '';

        if (pCode.includes('N') && pCode.includes('W')) {
            ret_code = 'B';
        } else if (pCode.includes('N')) {
            ret_code = 'N';
        } else if (pCode.includes('W')) {
            ret_code = 'W';
        } else {
            ret_code = 'C';
        }

        return ret_code;
    }

    /*
     * Parses the text passed as argument, that is supposed to be text shown in the textarea, 
     * and stores the datas into a dict which is returned, in order to be encoded
     * */
    this.getBoardMetaDatas = function (pFormatCode) {    
        let retBoardMetaDatas = {
            verticalWalls: {},
            horizontalWalls: {},
            robots: [],
            targetColor: 0,
            targetLocation: [0, 0],
        }

        let lines = pFormatCode.split("\n");
    
        //get the parameters of the first line
        var [keyword, sizeX, sizeY] = lines.shift().split(" ");
        if (keyword != "board") {
            throw "Expected keyword board";
        }
        
        //parse the map
        for (let y = 0; y < sizeY; y++) {
            lines.shift()
                .split(" ")
                .forEach((cell, x) => {
                    if (cell == "B" || cell == "N") {
                        retBoardMetaDatas.horizontalWalls[[x,y]] = true
                    }
                    if (cell == "B" || cell == "W") {
                        retBoardMetaDatas.verticalWalls[[x,y]] = true
                    }
                });
        }
        
        if (lines.shift() != "mirrors 0") {
            throw "Expected mirrors 0";
        } 
        
        //manage robots
        var [keyword, nbRobots] = lines.shift().split(" ");
        for (let robotIndex = 0; robotIndex < nbRobots; robotIndex++) {
            let [x, y] = lines.shift().split(" ");
            retBoardMetaDatas.robots.push([+x, +y]);
        }
        
        var [keyword, _, x, y, color] = lines.shift().split(" ");
        retBoardMetaDatas.targetColor = +color;
        retBoardMetaDatas.targetLocation = [+x, +y];
        
        return retBoardMetaDatas;
    }
    
    /*
     * Takes a dict returned by this.getBoardMetaDatas() method and generate an encoded64 string
     * in order to use it to the Kevin Cox's url
     * */
    this.encodeBoardMetaDatas = function (pBoardMetaDatas) {
        let retCode = [];
        
        retCode.push(16, 16);
        for (let x = 0; x < 16; x++) {
            let bits = 0;
            for (let y = 15; y >= 0; y--) {
                bits <<= 1;
                if (pBoardMetaDatas.horizontalWalls[[x, y]]) {
                    bits |= 1;
                }
            }
    
            retCode.push(bits & 0xFF, bits >> 8);
        }
    
        for (let y = 0; y < 16; y++) {
            let bits = 0;
            for (let x = 15; x >= 0; x--) {
                bits <<= 1;
                if (pBoardMetaDatas.verticalWalls[[x, y]]) {
                    bits |= 1;
                }
            }
    
            retCode.push(bits & 0xFF, bits >> 8);
        }
        
        retCode.push(0); // Mirrors
        
        retCode.push(pBoardMetaDatas.robots.length);
        for (let robot of pBoardMetaDatas.robots) {
            retCode.push(robot[0] << 4 | robot[1]);
        }
        
        retCode.push(pBoardMetaDatas.targetLocation[0] << 4 | pBoardMetaDatas.targetLocation[1]);
        retCode.push(pBoardMetaDatas.targetColor);
        
        return btoa(String.fromCharCode(...retCode))
            .replaceAll("+", "-")
            .replaceAll("/", "_");
    }

    /*
     * return the url to go to the Kevin Cox's website with the corresponding map
     * in order to use it to the Kevin Cox's url
     * */
    this.getMapUrlCode = function () {
        return (this.encodeBoardMetaDatas(this.getBoardMetaDatas(this.getFormatCode())));
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
 * - this.patternHasWall(pStrPattern, pLetterWall)
 * - this.checkBoard(pBoard)
 * - this.checkCoordsAreDistincts(pCoords, pArrayCoords)
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
     * */
    this.checkCoords = function (pCoords) {
        if (pCoords.x >= 0 && pCoords.x <= 15 && pCoords.y >= 0 && pCoords.y <= 15) {
            return (true);
        }

        return (false);
    };

    /*
     * this.patternHasWall(pStrPattern, pLetterWall):
     * Checks if a pattern contain a letterWall
     * */
    this.patternHasWall = function (pStrPattern, pLetterWall) {
        return (pStrPattern.split('').indexOf(pLetterWall) !== -1);
    }

    /*
     * this.checkBoard(pBoard):
     * checks if board is correctly formatted, which means
     * - is an array [16][16]
     * - each element is String
     * - each element is length [1 ; 4]
     * - each element is a '0' or a set containing one or more elements from NSEW
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

/*
 * BoardGame:
 * ------------
 * Object which is able to check letters, wall patterns or whole boards to tell if they are correctly filled
 * Contains:
 * - this.robots
 * - this.mirrors
 * - this.defineMap()
 * - this.getCellClassesOfMap(pMap)
 * - this.drawGrid(pBoard)
 * - this.addWallToCell(pCellCoords, pLetterWall)
 * - this.removeWallToCell(pCellCoords, pLetterWall)
 * - this.removeComplementaryWallsOf(pCoords)
 * - this.addComplementaryWallOf(pCoords, pLetterWall)
 * - this.updateCellDisplay(pCoords)
 * - this.addBorderWallsTo(pCoords)
 * - this.setCellPattern(pCoords, pLettersPattern)
 * - this.rand(pMin, pMax)
 * - this.randomPlaceRobots(pArrayRobotsCoords)
 * - this.placeRobots()
 * - this.moveRobotTo(pRobotEl, pCoords)
 * - this.clearMap()
 *
 * */
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

    /*
     * this.robots:
     * Object containing all coords of robots on the map
     * */
    this.robots = {
        blue: {x: 0, y: 6},
        red: {x: 0, y: 0},
        green: {x: 2, y: 6},
        yellow: {x: 9, y: 5},
        grey: {x: 4, y: 0},
    };

    /*
     * this.mirrors:
     * Object containing all coords of mirrors on the map
     * */
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
     * */
    this.defineMap = function () {
        if (!pBoard) {
            pBoard = this.emptyMap;
        }

        if (this.boardChecker.checkBoard(pBoard) === true) {
            this.map = pBoard;
        } else {
            this.map = [];
            throw 'ERROR: Map not well formated';
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

    /*
     * this.addComplementaryWallsOf(pCoords, pLetterWall):
     * Read the pattern of a cell and add walls at the other side of each border that has a wall
     * */
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
     * modifies the td#coord_y_x class attribute to show the cell with the walls defined in map[y][x]
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

    /*
     * DeepCopy this.emptyMap into this.map,
     * and then update the display of the whole map
     * */
    this.clearMap = function () {
        this.map = [...this.emptyMap].map((el) => [...el]);

        for (let yCoord = 0; yCoord < this.map.length; yCoord++) {
            for (let xCoord = 0; xCoord < this.map[yCoord].length; xCoord++) {
                this.updateCellDisplay({x: xCoord, y: yCoord});
            }
        }
    };

    this.defineMap();
}

/*
 * KeyboardListener:
 * ------------
 * Object that listen when user hit keys on the webpage to manage shortcuts features
 * Contains:
 * - this.doWhenIsPressed(pKey)
 * - this.activate()
 *
 * */
function KeyboardListener() {

    /*
     * Links keys pressed to actions,
     * */
    this.doWhenIsPressed = function (pKey) {
        switch(pKey) {
            //escape
            case 27:
                $('span#close_cell_menu').click();
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
//            default:
                //console.log(pKey);
        }
    };

    /*
     * Generate the eventListener(keyPress) on the web page
     * */
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



/*
 * MAIN
 * */
$(function () {
    let boardGame = new BoardGame(g_defaultBoard);
    let keyboardListener = new KeyboardListener();
    let mapCodeDisplayer = new MapCodeDisplayer(boardGame);
        mapCodeDisplayer.updateFormatCode();

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
        mapCodeDisplayer.updateFormatCode();
        $('textarea#format_code').slideToggle(200).select();
    });

    $('span#close_cell_menu').click(function () {
        mapCodeDisplayer.updateFormatCode();
        $('#choose_cell').hide(200, function () {
            $('#control_panel').fadeIn(200);
        });
    });

    $('textarea#format_code').click(function (e) {
        $(e.currentTarget).select();
    });

    $('button#clear_map').click(function () {
        boardGame.clearMap();        
    });

    $('button#go_play').click(function () {
        window.open('https://ricochetrobots.kevincox.ca/#s=' + mapCodeDisplayer.getMapUrlCode());
    });



});
