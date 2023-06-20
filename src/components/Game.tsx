import React, {useRef} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {gameLoop, startGame} from "../store/actions/gameAction";
import {useInterval} from "../hooks/useInterval";
import {CANVAS_SIZE} from "../utils/constants";
import {useCanvas} from "../hooks/useCanvas";
import {useControl} from "../hooks/useControl";
import {Button, ButtonGroup, Typography} from "@mui/material";
import {setGameStarted} from "../store/slices/game.slice";

const Game: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {snake, apple, gameOver, dir, speed, userName, score} = useSelector((state: RootState) => state.game);
    const dispatch = useAppDispatch();

    useCanvas(canvasRef, snake, apple, gameOver)
    useInterval(() => dispatch(gameLoop(snake, apple, dir, userName, score)), speed);
    useControl()

    return (
        <>
            <Typography variant="h1">{score}</Typography>
            <canvas
                style={{border: "2px solid #454552", borderRadius: '4px', margin: '10px'}}
                ref={canvasRef}
                width={`${CANVAS_SIZE[0]}px`}
                height={`${CANVAS_SIZE[1]}px`}
            />
            <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
            >
                <Button onClick={() => dispatch(startGame())}>Start Game</Button>
                <Button onClick={() => dispatch(setGameStarted(false))}>  Back to Start screen</Button>
            </ButtonGroup>
        </>
    );
};

export default Game;
