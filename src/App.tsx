import React from 'react';
import {useSelector} from "react-redux";
import Game from "./components/Game";
import StartScreen from "./components/StartScreen";
import {RootState} from "./store";
import Layout from "./components/Layout";

const App = () => {
    const {gameStarted} = useSelector((state: RootState) => state.game);

    if (!gameStarted) {
        return (
            <Layout>
                <StartScreen/>
            </Layout>
        );
    }

    return (
        <Layout>
            <Game/>
        </Layout>
    );
};

export default App;