const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/datetime.js');
const {
	getActiveUser,
	exitRoom,
	newUser,
	getIndividualRoomUsers,
} = require('./utils/users.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
	socket.on('joinRoom', ({ username, room }) => {
		const user = newUser(socket.id, username, room);

		socket.join(user.room);

		socket.emit(
			'message',
			formatMessage('Airtribe', 'Messages are limited to this room! ')
		);

		socket.broadcast
			.to(user.room)
			.emit(
				'message',
				formatMessage('Airtribe', `${user.username} has joined the room`)
			);

		io.to(user.room).emit('roomUsers', {
			room: user.room,
			users: getIndividualRoomUsers(user.room),
		});
	});

	socket.on('chatMessage', (msg) => {
		const user = getActiveUser(socket.id);

		io.to(user.room).emit('message', formatMessage(user.username, msg));
	});

	socket.on('disconnect', () => {
		const user = exitRoom(socket.id);

		if (user) {
			io.to(user.room).emit(
				'message',
				formatMessage('Airtribe', `${user.username} has left the room`)
			);

			io.to(user.room).emit('roomUsers', {
				room: user.room,
				users: getIndividualRoomUsers(user.room),
			});
		}
	});
});

const PORT = 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
