const AutoDrivingCar = require('./AutoDrivingCar');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter width and height: ', (whInput) => {
    const [width, height] = whInput.split(' ').map(Number);
    rl.question('Enter initial position and facing direction: ', (posInput) => {
        const [x, y, facing] = posInput.split(' ');
        rl.question('Enter commands: ', (commands) => {
            const car = new AutoDrivingCar('Car',width, height, [Number(x), Number(y)], facing);
            car.executeCommands(commands);
            console.log(car.getPositionAndFacing());
            rl.close();
        });
    });
});