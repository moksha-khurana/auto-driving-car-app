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
        if (this.isValidPosition(x, y)) {
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

    getPosition() {
        return `${this.position[0]} ${this.position[1]}`;
    }
}

function checkCollision(cars) {
    const visited = new Set();
    for (let step = 1; ; step++) {
        const positions = new Map();
        for (let car of cars) {
            const [x, y] = car.position;
            if (visited.has(`${x} ${y}`)) {
                return `Collision at ${x} ${y} at step ${step}`;
            }
            positions.set(`${x} ${y}`, car.name);
        }
        visited.clear();
        for (let [position, name] of positions) {
            visited.add(position);
        }
        for (let car of cars) {
            car.moveForward();
        }
        if (cars.every(car => !car.isValidPosition(car.position[0], car.position[1]))) {
            return 'no collision';
        }
    }
}

// Example usage
const cars = [
    new AutoDrivingCar('A', 10, 10, [1, 2], 'N'),
    new AutoDrivingCar('B', 10, 10, [7, 8], 'W')
];

cars[0].executeCommands('FFRFFFFRRL');
cars[1].executeCommands('FFLFFFFFFF');

console.log(checkCollision(cars));
