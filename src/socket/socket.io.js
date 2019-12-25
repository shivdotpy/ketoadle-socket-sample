import io from 'socket.io-client';
import { BASE_API_URL } from '../constants/constants';

let socket = null;

const connectToSocket = () => {
	return io(BASE_API_URL);
};

export const suscribeToSocket = (token) => {
	socket = connectToSocket();
    socket.emit('registerSocketUser', token);
    global.socket = socket;
};


