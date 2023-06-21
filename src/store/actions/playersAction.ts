import {fetchPlayersError, fetchPlayersStart, fetchPlayersSuccess} from "../slices/players.slice";

export const fetchUsers = () => {
    return async (dispatch: any) => {
        dispatch(fetchPlayersStart());
        try {
            const response = await fetch(`https://snake-node-js.vercel.app/players`);
            const data = await response.json();
            console.log(data);
            dispatch(fetchPlayersSuccess(data));
        } catch (error: any) {
            dispatch(fetchPlayersError(error));
        }
    };
};

export async function addNewResult(user: { name: string, score: number }) {
    const player = JSON.stringify(user)
    console.log(player)
    try {
        const response = await fetch('https://snake-node-js.vercel.app/players', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: player,
        });
        if (response.status === 201) {
            const data = await response.json();
            console.log(data);
        } else {
            console.log('Unexpected response:', response);
        }
    } catch (error) {
        console.log('process network errors:', error);
    }
}