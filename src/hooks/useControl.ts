import {useEffect} from "react";
import {setDir} from "../store/slices/game.slice";
import {useAppDispatch} from "./useAppDispatch";

export function useControl() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            let direction: number[] | null = null;

            switch (event.key) {
                case 'ArrowUp':
                case 'w':
                    direction = [0, -1];
                    break;
                case 'ArrowDown':
                case 's':
                    direction = [0, 1];
                    break;
                case 'ArrowLeft':
                case 'a':
                    direction = [-1, 0];
                    break;
                case 'ArrowRight':
                case 'd':
                    direction = [1, 0];
                    break;
                default:
                    break;
            }

            if (direction !== null ) {
                dispatch(setDir(direction));
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [dispatch]);

}