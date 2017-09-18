var rover1 = {
  name: 'Rover One',
  position: [0,0],
  direction: 'N',
  marker: '1'
};

var rover2 = {
  name: 'Rover Two',
  position: [9,9],
  direction: 'S',
  marker: '2'
};

function goForward(rover) {
  switch(rover.direction) {
    case 'N':
      rover.position[0]++
      break;
    case 'E':
      rover.position[1]++
      break;
    case 'S':
      rover.position[0]--
      break;
    case 'W':
      rover.position[1]--
      break;
  };
  sphere(rover);
  console.log("New " + rover.name + " Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
  return findObstacles(rover);
}

function goBackward(rover) {
  switch(rover.direction) {
    case 'N':
      rover.position[0]--
      break;
    case 'E':
      rover.position[1]--
      break;
    case 'S':
      rover.position[0]++
      break;
    case 'W':
      rover.position[1]++
      break;
  };
  sphere(rover);
  console.log("New " + rover.name + " Position: [" + rover.position[0] + ", " + rover.position[1] + "]")
  return findObstacles(rover);
}

function turnLeft(rover) {
  rover.direction = "W";
  findObstacles(rover);
  console.log("New " + rover.name + " Position: [" + rover.position[0] + ", " + rover.position[1] + "]")
}

function turnRight(rover) {
  rover.direction = "E";
  findObstacles(rover);
  console.log("New " + rover.name + " Position: [" + rover.position[0] + ", " + rover.position[1] + "]")
}

function createGrid() {
  console.log("--- Rover " + rover1.name + " Starting Position: [" + rover1.position[0] + ", " + rover1.position[1] + "], " + rover1.direction + " ---");
  console.log("--- Rover " + rover2.name + " Starting Position: [" + rover2.position[0] + ", " + rover2.position[1] + "], " + rover2.direction + " ---");

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
  grid[rover1.position[0]][rover1.position[1]] = '#';
  grid[rover2.position[0]][rover2.position[1]] = '#';
  return grid.reverse();
}

function sphere(rover) {
  if (rover.position[1] < 0 ) { rover.position[1] = 9; }
  if (rover.position[0] < 0 ) { rover.position[0] = 9; }
  if (rover.position[1] > 9 ) { rover.position[1] = 0; }
  if (rover.position[0] > 9 ) { rover.position[0] = 0; }
}

function findObstacles(rover) {
  for (var i = 0; i < mars.length; i++) {
    for (var j = 0; j < mars[i].length; j++) {
      if (mars[rover.position[0]][rover.position[1]] === '?') {
        console.log("Oh oh. There's an obstacle, Nasa!");
        console.log(mars.reverse());
        return true;
      } else if (JSON.stringify(rover1.position) === JSON.stringify(rover2.position)) {
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

function moveRover(commands, rover, mars) {
  for (var i = 0; i < commands.length; i++) {
    console.log(commands[i]);
    switch(commands[i]) {
      case 'f':
        if (goForward(rover)) { return };
        break;
      case 'b':
        if (goBackward(rover)) { return };
        break;
      case 'r':
        if (turnRight(rover)) { return };
        break;
      case 'l':
        if (turnLeft(rover)) { return };
        break;
      default:
        alert("That direction doesn't exist!");
    }
  }
  console.log(mars.reverse());
}

////////////////////////////////////////////////////////////////////////////////
var mars = createGrid();
moveRover('ffflffbf', rover1, mars.reverse());
moveRover('ffflffbf', rover2, mars.reverse());
