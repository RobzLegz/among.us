import * as dotenv from 'dotenv';
import {
    playerJoin,
    players,
    removePlayer,
} from './logic/player';
import { Server } from 'socket.io';

dotenv.config();

const server = new Server(Number(process.env.PORT), {});

console.log("server running on port " + process.env.PORT)

server.on('connection', (socket) => {
    console.log('a user connected.');

    socket.on('join', (username: string) => {
        playerJoin(username, socket.id);

        server.emit('getPlayers', players);
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected!');

        removePlayer(socket.id);
        server.emit('getPlayers', players);
    });
});
