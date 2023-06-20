import React, {useEffect} from 'react';
import {CircularProgress, List, ListItem, ListItemText, ListSubheader} from "@mui/material";
import {fetchUsers} from "../store/actions/playersAction";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {Player} from "../types/playerTypes";


function renderRow(user: Player) {
    return (
        <ListItem key={user.id} component="div">
            <ListItemText primary={user.name} secondary={`Points ${user.score}`}/>
        </ListItem>
    );
}

const LeaderBoard = () => {
    const dispatch = useAppDispatch();
    const {players, isLoading} = useSelector((state: RootState) => state.players);

    useEffect(() => {
        console.log('fetchUsers();');
        if (players.length === 0){
            dispatch(fetchUsers());
        }
    }, [])

    if (isLoading) return <CircularProgress/>;

    return (
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            <ListSubheader component="div" id="nested-list-subheader">
                Top leaders
            </ListSubheader>
            {players.map((player) => (renderRow(player)))}
        </List>
    );
};

export default LeaderBoard;