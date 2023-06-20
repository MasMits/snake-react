export interface Player {
    id: number;
    name: string;
    score: number;
}

export interface PlayersState {
    players: Player[];
    isLoading: boolean;
    error: string | null;
}