const AutoDrivingCar = require('./AutoDrivingCar');
const readline = require('readline');

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const widthHeight = await new Promise((resolve) => {
        rl.question("Enter field width and height (e.g., 10 10): ", (answer) => {
            resolve(answer.split(" ").map(Number));
        });
    });

    const numCars = await new Promise((resolve) => {
        rl.question("Enter the number of cars: ", (answer) => {
            resolve(parseInt(answer, 10));
        });
    });

    const cars = [];
    for (let i = 0; i < numCars; i++) {
        const carPositionFacing = await new Promise((resolve) => {
            rl.question(`Enter position and facing direction for Car ${i + 1} (e.g., 1 2 N): `, (answer) => {
                resolve(answer.split(" "));
            });
        });

        const carCommands = await new Promise((resolve) => {
            rl.question(`Enter commands for Car ${i + 1} (e.g., FFRFFFFRRL): `, (answer) => {
                resolve(answer);
            });
        });

        const [x, y, facing] = carPositionFacing;
        cars.push(new AutoDrivingCar(`Car ${i + 1}`, widthHeight[0], widthHeight[1], [parseInt(x, 10), parseInt(y, 10)], facing));
        cars[i].executeCommands(carCommands);
    }

    const collisionInfo = checkCollision(cars);
    if (collisionInfo === 'no collision') {
        console.log('no collision');
    } else {
        console.log(collisionInfo);
    }

    rl.close();
}

function checkCollision(cars) {
    const visited = new Set();
    for (let step = 1; ; step++) {
        const positions = new Map();
        for (let car of cars) {
            const [x, y] = car.position;
            if (visited.has(`${x} ${y}`)) {
                return `${cars[0].name} ${cars[1].name}\n${x} ${y}\n${step}`;
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

main();

module.exports = main; 
