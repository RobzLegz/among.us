import { shuffle } from '../utils/shuffleArray';
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

export const setRoles = () => {
    if (players[0].role === 'waiting') {
        players = shuffle(players).map((player: Player) => {
            if (
                players.filter(
                    (p) =>
                        p.role === 'mafia' ||
                        p.role === 'doctor' ||
                        p.role === 'police'
                ).length >= 3
            ) {
                player.role = 'default';
            } else if (!players.find((p) => p.role === 'mafia')) {
                player.role = 'mafia';
            } else if (!players.find((p) => p.role === 'police')) {
                player.role = 'police';
            } else if (!players.find((p) => p.role === 'doctor')) {
                player.role = 'doctor';
            }

            return player;
        });
    }
};

export { players };
