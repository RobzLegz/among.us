import { io } from 'socket.io-client';
import { input } from './utils/input';
import { Player } from './types/player';

const socket = io('http://localhost:6000');

let players: Player[] = [];

socket.on('gameFull', (payload) => {
    console.log('Game full, try again later');
});

socket.on('getPlayers', (payload) => {
    players = payload;

    console.log(`${players.length}/10 players online`);
});

socket.on("gameStarted", (payload) => {
    
})

const main = async () => {
    const username = await input('Enter your username: ');

    socket.emit('join', { username });
};

main();
