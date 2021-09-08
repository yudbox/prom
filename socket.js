// -------------------CLIENT PART-------------------

import SoketIO from 'socket.io-client';

let _socket = null;
const host = location.host
const socketParams = {
    'reconnection': true,          //включаем переподключения
    'reconnectionDelay': 5000,    //задержка перед отправкай запроса на переподключения
    'reconnectionAttempts': 12,    //количество попыток переподключится
    'forceNew': true
  },


    _socket = SoketIO.connect(host, socketParams);

    _socket.emit("conversations:send", {data: someData});
    _socket.on("conversations:get", data => {
    console.log('do domething with', data);
    });

    // -------------------SERVER PART-------------------


const http = require('http');
const express = require('express');



    

let app = express();
let server = http.Server(app);
let SocketHandler = require('./handler'); // функция которая используется как middleware см. ниже
let SocketIO = require('socket.io');


const SocketRoutes = (socket) => {
    socket.on('conversations:get', dataFromClient => {
        //do something with dataFromClient
    });

}
//////////----------------------отдельный модуль---------------------
module.exports = (server) => {
    let _sio = null;
    _sio = SocketIO(server);
    _sio.use(SocketHandler.checkAuth); //middleware auntification
    _sio.on('connection', socket => { // запускаем сокет и методы 
        // Emit to all sockets
        socket.emitAll = (event, data) => _sio.emit(event, data);

        // Emit to the room
        socket.emitRoom = (roomID, event, data) => _sio.in(roomID).emit(event, data);

        // Emit to the room, except current socket
        socket.broadcastRoom = (roomID, event, data) => socket.broadcast.to(roomID).emit(event, data);

        // Emit by id
        socket.emitById = (socketID, event, data) => _sio.sockets.connected[socketID] && _sio.sockets.connected[socketID].emit(event, data);
	
        // Emit error
        socket.err = (data) => socket.emit("err", data);
	
        // Attach conversation event
        SocketHandler.attachConversationEvents(socket);

        // Attach mapsets events
        //SocketHandler.attachMapsetsEvents(socket);

        SocketRoutes(socket);
    });

}

//////////----------------------отдельный модуль---------------------

let socket = require('../util/Sockets')(server);

//ложим сокеты в обычные  роуты
app.use((request, response, next) => {
    response.locals.socket = socket;
    next();
});

/**
 * Запускаем сервер
 */

 server.timeout = parseInt(config.server.timeout);

 server.listen(config.server.port_api, () => {
     console.log('[OK] Api server listening on port ' + config.server.port_api);
 });



 //middleware for authentification socets


 const SocketHandler = {
    checkAuth(socket, next) {
		// Define user id var
		let idu = false;
		// Get the session id
		let ids = Cookie.get(socket.client.request);
		// Init the error method to not duplicate
		let err = () => next(new Error('Not authorized'));
		
		// Check the session id in sessions collection
		return db.exist('sessions', {_id: ids})
			.then(({session} = {}) => {
				
				// Если нет сессии, кидаем ошибку
				if (!session) {
					return err();
				}
				
				// Потыемся распарсить JSON строку в JSON объект.
				// Если не получается или в результате мы не получаем idu, то кидаем ошибку
				try {
					session = JSON.parse(session) || {};
					idu = session.idu;
					
					if (!idu) {
						return err();
					}
				}
				catch (error) {
					Logger(error);
					return err();
				}

				if (idu === config.su.id) {
					return next();
				}

				// Get user basic info
				return db.aggregate('users', [
						{$match: {_id: db.ObjectId(idu), role: {$exists: true}}},
						{$lookup: {from: "roles", as: "roles", localField: "role", foreignField: "_id"}},
						{$project: {name: {$concat: ['$name', ' ', '$lastName']}, avatar: 1, email: 1, teams: 1, cnvFavorites: 1, acl: {$arrayElemAt: ["$roles.acl", 0]}}}
				])
					.then(([user]) => {
						// If user isn't founded catch error
						if (!user) {
							return err();
						}
						
						// Set string idu
						user.idu = user._id.toString();
						
						// Пишем данные в объект сокета
						socket.idu = idu;
						socket.user = user;
						
						// Join user to the rooms, he has access
						This._joinToRooms(socket);
						next();
					})

			})
			.catch((error) => {
				Logger(error);
				err();
			});
	},
	
	
	/**
	 * Join user to the rooms, he has access
	 * @param socket
	 * @private
	 */
	_joinToRooms(socket) {
		let {idu, user} = socket;
		let {_id, teams = []} = user;
		// Check if the user is the admin on the page
		let admin = Functions.hasRightsTo({idu, user}, 'admin', 'conversations');
		
		// Get user teams and set it to the socket 
		return new Promise((resolve, reject) => {
			if (!admin) {
				return resolve(teams);
			}
			
			// Get all team ids
			return db.aggregate('teams', [
				{$match: {active: true, removed: {$ne: true}}},
				{$group: {_id: "$active", ids: {$push: "$_id"}}}
			]).then(([{ids} = {}]) => resolve(ids))
			
		}).then((teams) => {
			
			// Get the applications ids for user
			return new Promise((resolve, reject) => {
				
				let query = [
					{$match: {active: true, removed: {$ne: true}}},
					{$project: {_id: 1, flag: 1}},
					{$group: {_id: "$flag", ids: {$addToSet: "$_id"}}}
				];
				
				if (!admin) {
					query[0].$match.$or = [{"teams.id": {$in: teams}}, {creator: _id }];
				}
				
				return resolve(db.aggregate('applications', query))
			})
				.then(([{ids = []} = {}]) => {

					// Add user to the rooms
					ids.concat(teams).map((roomID) => {
						socket.join(roomID.toString());
					});
					
				});
			})
			.catch((error) => {
				Logger(error);
				socket.err("Cannot add user to the list of conversation");
			})
	},
	
	
	/**
	 * Attach conversation events to the socket instance
	 * @param socket
	 */
	attachConversationEvents(socket) {
		
		// conversation create
		socket.cnvCreateSucs = (data) => socket.emit('conversations:create:success', data);
		socket.cnvCreateErr = (data) => {
			socket.emit('conversations:create:error');
			data && socket.err(data);
		};
		
		// post message
		socket.cnvPostSucs = (data) => socket.emit('conversations:post:success', data);
	}
}