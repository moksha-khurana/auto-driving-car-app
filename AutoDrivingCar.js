const readline = require('readline');

class AutoDrivingCar {
    constructor(name, width, height, position, facing) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.position = position;
        this.facing = facing;
        this.directions = ['N', 'E', 'S', 'W']; // North, East, South, West
    }

    move(command) {
        switch(command) {
            case 'L':
                this.rotateLeft();
                break;
            case 'R':
                this.rotateRight();
                break;
            case 'F':
                this.moveForward();
                break;
        }
    }

    rotateLeft() {
        const currentDirectionIndex = this.directions.indexOf(this.facing);
        this.facing = this.directions[(currentDirectionIndex + 3) % 4]; // Rotate 90 degrees left
    }

    rotateRight() {
        const currentDirectionIndex = this.directions.indexOf(this.facing);
        this.facing = this.directions[(currentDirectionIndex + 1) % 4]; // Rotate 90 degrees right
    }

    moveForward() {
        let [x, y] = this.position;
        switch(this.facing) {
            case 'N':
                y++;
                break;
            case 'E':
                x++;
                break;
            case 'S':
                y--;
                break;
            case 'W':
                x--;
                break;
        }
        // Check if the new position is within the boundary
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.position = [x, y];
        }
    }

    isValidPosition(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    executeCommands(commands) {
        for (let command of commands) {
            this.move(command);
        }
    }

    getPositionAndFacing() {
        return `${this.position[0]} ${this.position[1]} ${this.facing}`;
    }
}


module.exports = AutoDrivingCar;

