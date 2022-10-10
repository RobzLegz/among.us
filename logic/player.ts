import { Player } from '../types/player';

let players: Player[] = [];

export const playerJoin = (username: string, socketId: string) => {
    const joined = players.some((p) => username === p.username);

    if (!joined) {
        const new_socket_player: Player = {
            s_id: socketId,
            username,
            dead: false,
            role: 'waiting',
        };

        players = [...players, new_socket_player];
    }
};

export const getPlayerFromSocket = (socketId: string) => {
    return players.find((player) => player.s_id === socketId);
};

export const removePlayer = (socketId: string) => {
    players = players.filter((player) => player.s_id !== socketId);
};

export { players };
