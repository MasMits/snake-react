import { CANVAS_SIZE, SCALE, SNAKE_START, SPEED} from "../../utils/constants";
import {
    addScore,
    resetScore,
    setApple,
    setDir,
    setGameOver,
    setGameStarted,
    setSnake,
    setSpeed
} from "../slices/game.slice";
import {IApple} from "../../types/gameTypes";
import {addNewResult} from "./playersAction";

export const endGame = (userName: string, score: number) => {
    return (dispatch: any) => {
        dispatch(setSpeed(null));
        dispatch(setGameOver(true));
        const user = {name: userName, score: score}
        console.log(user);
        addNewResult(user);
    }
};


const createApple = (apple: IApple): IApple => {
    return {
        appleCoordinate: apple.appleCoordinate.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE))),
        typeOfApple: Math.floor(Math.random() * (3)),
    }
}

const checkCollision = (piece: number[], snk: number[][]): boolean => {
    if (
        piece[0] * SCALE >= CANVAS_SIZE[0] ||
        piece[0] < 0 ||
        piece[1] * SCALE >= CANVAS_SIZE[1] ||
        piece[1] < 0
    )
        return true;

    for (const segment of snk) {
        if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
};

const checkAppleCollision = (newSnake: number[][], apple: IApple, score: number) => {
    return (dispatch: any) => {
        if (newSnake[0][0] === apple.appleCoordinate[0] && newSnake[0][1] === apple.appleCoordinate[1]) {
            switch (apple.typeOfApple) {
                case 0: {
                    dispatch(addScore(1));
                    break;
                }
                case 1: {
                    dispatch(addScore(5));
                    break;
                }
                case 2: {
                    dispatch(addScore(10));
                    break;
                }
            }

            let newApple = createApple(apple);
            while (checkCollision(newApple.appleCoordinate, newSnake)) {
                newApple = createApple(apple);
            }
            dispatch(setSpeed(SPEED - Math.floor(score/50) * SPEED/20 ));
            dispatch(setApple(newApple));
            return true;
        }
        return false;
    }
};

export const gameLoop = (snake: number[][], apple: IApple, dir: number[], userName: string, score: number) => {
    return (dispatch: any) => {
         const snakeCopy = JSON.parse(JSON.stringify(snake)) as number[][];
        const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
        snakeCopy.unshift(newSnakeHead);
        if (checkCollision(newSnakeHead, snake)) dispatch(endGame(userName, score));
        if (!dispatch(checkAppleCollision(snakeCopy, apple, score))) snakeCopy.pop();
        dispatch(setSnake(snakeCopy));
    };
};

export const startGame = () => {
    return async (dispatch: any) => {
        dispatch(resetScore());
        dispatch(setSnake(SNAKE_START));
        // dispatch(setApple(APPLE_START));
        dispatch(setDir([0, -1]));
        dispatch(setSpeed(SPEED));
        dispatch(setGameOver(false));
        dispatch(setGameStarted(true));
    }
};
