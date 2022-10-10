import * as dotenv from 'dotenv';
import { playerJoin, players, removePlayer } from './logic/player';
import { Server } from 'socket.io';

dotenv.config();

const server = new Server(Number(process.env.PORT), {});

console.log('server running on port ' + process.env.PORT);

server.on('connection', (socket) => {
    console.log('a user connected.');

    socket.on('join', (username: string) => {
        if (players.length >= 10) {
            server.emit('gameFull', null);
            return;
        }

        playerJoin(username, socket.id);

        if (players.length >= 5) {
            server.emit('gameStarted', true);
        }

        server.emit('getPlayers', players);
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected!');

        removePlayer(socket.id);
        server.emit('getPlayers', players);
    });
});
