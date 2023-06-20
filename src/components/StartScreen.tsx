import React from 'react';
import {Button, TextField, Typography} from "@mui/material";
import LeaderBoard from "./LeaderBoard";
import {startGame} from "../store/actions/gameAction";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {setUserName} from "../store/slices/game.slice";

 const StartScreen = () => {
    const dispatch = useAppDispatch();
    const {userName} = useSelector((state: RootState) => state.game);

    const handleChange = (event: any) => {
        const newValue = event.target.value;
        dispatch(setUserName(newValue));
    };

    return (
        <>
            <Typography variant="h3" color="secondary">THIS IS SNAKE GAME!</Typography>
            <Typography variant="h4">write your nick to start play:</Typography>
            <TextField  value={userName} onChange={handleChange} label="Nick" variant="filled" sx={{width: '100%', maxWidth: 360}}/>
            <Button variant="contained" onClick={() => dispatch(startGame())} sx={{width: '100%', maxWidth: 360}} disabled={!Boolean(userName)}>
                Start Game
            </Button>
            <LeaderBoard/>
        </>
    );
};

export default StartScreen;