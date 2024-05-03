const AutoDrivingCar = require('./AutoDrivingCar');

describe('AutoDrivingCar', () => {
    let car;

    beforeEach(() => {
        car = new AutoDrivingCar('Car', 5, 5, [0, 0], 'N');
    });

    describe('Initialization', () => {
        it('should initialize car with correct properties', () => {
            expect(car.name).toBe('Car');
            expect(car.width).toBe(5);
            expect(car.height).toBe(5);
            expect(car.position).toEqual([0, 0]);
            expect(car.facing).toBe('N');
        });
    });

    describe('Movement', () => {
        it('should move forward correctly', () => {
            car.moveForward();
            expect(car.position).toEqual([0, 1]);
        });

        it('should rotate left correctly', () => {
            car.rotateLeft();
            expect(car.facing).toBe('W');
        });

        it('should rotate right correctly', () => {
            car.rotateRight();
            expect(car.facing).toBe('E');
        });

        it('should execute commands correctly', () => {
            car.executeCommands(['F', 'L', 'F', 'R']);
            expect(car.getPositionAndFacing()).toBe('0 1 N');
        });

        it('should handle moving out of boundary', () => {
            // Move car to the bottom right corner
            car.position = [4, 4];
            car.facing = 'E';
            // Move forward, should stay at the same position
            car.moveForward();
            expect(car.position).toEqual([4, 4]);
        });
    });

    describe('Error handling', () => {
        it('should throw error for invalid command', () => {
            expect(() => car.move('Z')).toThrowError('Invalid command');
        });

        it('should throw error for invalid position', () => {
            // Set car at invalid position
            car.position = [6, 6];
            expect(() => car.moveForward()).toThrowError('Invalid position');
        });
    });
});
