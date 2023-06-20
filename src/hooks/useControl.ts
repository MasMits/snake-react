import {useEffect} from "react";
import {setDir} from "../store/slices/game.slice";
import {useAppDispatch} from "./useAppDispatch";

export function useControl() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            let direction: number[] | null = null;
            switch (event.keyCode) {
                case 38: // up
                case 87: // 'W' or 'w'
                    direction = [0, -1];
                    break;
                case 40: // down
                case 83: // 'S' or 's'
                    direction = [0, 1];
                    break;
                case 37: // left
                case 65: // 'A' or 'a'
                    direction = [-1, 0];
                    break;
                case 39: // right
                case 68: // 'D' or 'd'
                    direction = [1, 0];
                    break;
                default:
                    break;
            }

            if (direction !== null ) {
                event.preventDefault();
                dispatch(setDir(direction));
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [dispatch]);

}