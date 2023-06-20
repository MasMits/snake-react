import {configureStore} from "@reduxjs/toolkit";
import gameReducer from './slices/game.slice';
import playersReducer from './slices/players.slice';
import thunk from 'redux-thunk'

export const store = configureStore({
    reducer: {
        game: gameReducer,
        players: playersReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;