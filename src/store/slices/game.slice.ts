import {createSlice} from "@reduxjs/toolkit";
import {SNAKE_START, APPLE_START} from "../../utils/constants";

const gameSlice = createSlice({
    name: "game",
    initialState: {
        snake: SNAKE_START,
        apple: {
            appleCoordinate: APPLE_START,
            typeOfApple: 2,
        },
        dir: [0, -1],
        speed: null,
        gameStarted: false,
        gameOver: false,
        score: 0,
        userName: '',
    },
    reducers: {
        setSnake: (state, action) => {
            state.snake = action.payload;
        },
        setApple: (state, action) => {
            state.apple = action.payload;
        },
        setDir: (state, action) => {
            // We check that the direction is not the same or irreversible
            if (Boolean(state.dir[0]) !== Boolean(action.payload[0]) &&
                Boolean(state.dir[1]) !== Boolean(action.payload[1])) {
                state.dir = action.payload;
            }
        },
        setSpeed: (state, action) => {
            state.speed = action.payload;
        },
        setGameOver: (state, action) => {
            state.gameOver = action.payload;
        },
        setGameStarted: (state, action) => {
            console.log(action.payload);
            state.gameStarted = action.payload;
        },
        resetScore: (state) => {
            state.score = 0;
        },
        addScore: (state, action) => {
            state.score += action.payload;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
    },
});


export const {
    setSnake,
    setApple,
    setDir,
    setSpeed,
    setGameStarted,
    setGameOver,
    resetScore,
    addScore,
    setUserName,
} = gameSlice.actions;

export default gameSlice.reducer;
