import {useEffect} from "react";
import {SCALE} from "../utils/constants";
import {IApple} from "../types/gameTypes";

export function useCanvas(canvasRef: any, snake: number[][], apple: IApple, gameOver: boolean) {
    useEffect(() => {
        const context = canvasRef.current?.getContext("2d");
        if (context) {
            context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
            context.clearRect(0, 0, window.innerWidth, window.innerHeight);
            context.fillStyle = "#81C784";
            snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
            switch(apple.typeOfApple){
                case 0: {
                    context.fillStyle = "#E57373";
                    break;
                }
                case 1:{
                    context.fillStyle = "#e5c173";
                    break;
                }
                case 2:{
                    context.fillStyle = "#b773e5";
                    break;
                }
            }
            context.fillRect(apple.appleCoordinate[0], apple.appleCoordinate[1], 1, 1);
        }
    }, [snake, apple, gameOver]);

}