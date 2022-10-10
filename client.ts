import { io } from 'socket.io-client';
import { input } from './utils/input';
import { Player } from './types/player';

const socket = io('http://localhost:6000');

let players: Player[] = [];
let s_id: string | null = null;
let player: Player | undefined = undefined;

socket.on('gameFull', (payload) => {
    console.log('Game full, try again later');
});

socket.on('getPlayers', (payload) => {
    players = payload.players;

    if (!s_id) {
        s_id = payload.s_id;
    }

    if (!player) {
        player = players.find((p) => p.s_id === s_id);
    }

    console.log(`${players.length}/10 players online`);
});

socket.on('gameStarted', (payload) => {
    players = payload;

    player = players.find((p) => p.s_id === s_id);

    console.log('Game has begun');
    console.log(`You are ${player?.role}`);
});

const main = async () => {
    const username = await input('Enter your username: ');

    socket.emit('join', { username });
};

main();
