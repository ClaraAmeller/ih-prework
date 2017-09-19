var myRover1 = {
    name: 'Rover One',
    position: [0, 0],
    direction: 'N',
    marker: '1'
};

var myRover2 = {
    name: 'Rover Two',
    position: [9, 9],
    direction: 'S',
    marker: '2'
};

function createGrid() {
    var grid = [];
    for (var i = 0; i < 10; i++) {
        var columns = [];
        for (var j = 0; j < 10; j++) {
            columns[j] = ' ';
        }
        grid[i] = columns;
    }

    for (var obstacles = 0; obstacles < Math.floor((Math.random() * 5) + 1); obstacles++) {
        grid[Math.floor((Math.random() * 9) + 1)][Math.floor((Math.random() * 9) + 1)] = '?';
    }

    grid[myRover1.position[0]][myRover1.position[1]] = '#';
    grid[myRover2.position[0]][myRover2.position[1]] = '#';

    return grid.reverse();
}

function sphere(rover) {
    if (rover.position[1] < 0) {
        rover.position[1] = 9;
    }
    if (rover.position[0] < 0) {
        rover.position[0] = 9;
    }
    if (rover.position[1] > 9) {
        rover.position[1] = 0;
    }
    if (rover.position[0] > 9) {
        rover.position[0] = 0;
    }
}

function findObstacles(rover) {
    for (var i = 0; i < mars.length; i++) {
        for (var j = 0; j < mars[i].length; j++) {
            if (mars[rover.position[0]][rover.position[1]] === '?') {
                console.log("Oh oh. There's an obstacle, Nasa!");
                console.log(mars.reverse());
                return true;
            } else if (JSON.stringify(myRover1.position) === JSON.stringify(myRover2.position)) {
                console.log("Oh oh. A collision!");
                console.log(mars.reverse());
                return true;
            } else if (mars[i][j] === rover.marker) {
                mars[i][j] = '+';
            }
        }
    }
    mars[rover.position[0]][rover.position[1]] = rover.marker;
}

function advance(rover, position) {
    switch (rover.direction) {
        case 'N':
            rover.position[0] += position;
            break;
        case 'E':
            rover.position[1] += position;
            break;
        case 'S':
            rover.position[0] -= position;
            break;
        case 'W':
            rover.position[1] -= position;
            break;
    };
    sphere(rover);
    console.log("New " + rover.name + " Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
    return findObstacles(rover);
}

function turn(rover, direction) {
    rover.direction = direction;
    console.log("New " + rover.name + " Position: [" + rover.position[0] + ", " + rover.position[1] + "]")
}

function moveRover(commands, rover, mars) {
    console.log("--- Rover " + rover.name + " Starting Position: [" + rover.position[0] + ", " + rover.position[1] + "], " + rover.direction + " ---");
    for (var i = 0; i < commands.length; i++) {
        console.log(commands[i]);
        switch (commands[i]) {
            case 'f':
                if (advance(rover, 1)) {
                    return
                };
                break;
            case 'b':
                if (advance(rover, -1)) {
                    return
                };
                break;
            case 'r':
                turn(rover, 'E');
                break;
            case 'l':
                turn(rover, 'W');
                break;
            default:
                alert("That direction doesn't exist!");
        }
    }
    console.log(mars.reverse());
}

////////////////////////////////////////////////////////////////////////////////
var mars = createGrid();
moveRover('ffflffbf', myRover1, mars.reverse());
moveRover('ffflffbf', myRover2, mars.reverse());
