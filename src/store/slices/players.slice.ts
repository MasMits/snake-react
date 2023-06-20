import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Player, PlayersState} from "../../types/playerTypes";

const initialState: PlayersState = {
    players: [],
    isLoading: true,
    error: null,
};

const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        fetchPlayersStart: (state) => {
            state.isLoading = true;
        },
        fetchPlayersSuccess: (state, action: PayloadAction<Player[]>) => {
            state.isLoading = false;
            state.error = null;
            state.players.push(...action.payload);
        },
        fetchPlayersError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});


export const {
    fetchPlayersStart,
    fetchPlayersSuccess,
    fetchPlayersError,
} = playersSlice.actions;

export default playersSlice.reducer;