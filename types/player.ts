export interface Player {
    s_id: string;
    username: string;
    dead: boolean;
    role: 'waiting' | 'doctor' | 'mafia' | 'default' | "police";
}
