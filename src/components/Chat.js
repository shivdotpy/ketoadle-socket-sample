import React, { useEffect, useState } from 'react';
import './Chat.css';
import { parseJwt, getAccessToken } from '../utils/common-methods';
import axios from 'axios';
import { BASE_API_URL } from '../constants/constants';

export const Chat = () => {
	const [ chatMessage, setChatMessage ] = useState('');

	useEffect(() => {
		subscribeToMessage();
		getChatHistory();
	}, []);

	const subscribeToMessage = () => {
		global.socket.on('chatMessage', (data) => {
			console.log('message coming from other user', data);
		});
	};

	const onSubmitMessage = () => {
		global.socket.emit('message', {
			chatId: '5dd143c39ee7e00017a94596-5dd143f89ee7e00017a94599',
			message: chatMessage,
			userId: parseJwt(JSON.parse(localStorage.getItem('user')).token)._id
		});
	};

	const getChatHistory = () => {
		axios
			.post(
				`${BASE_API_URL}/api/chat/getChatHistory`,
				{
					chatId: '5dd143c39ee7e00017a94596-5dd143f89ee7e00017a94599'
				},
				{
					headers: {
						token: getAccessToken()
					}
				}
			)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	return (
		<div className="container mt-5">
			<div className="card" style={{ height: '80vh' }}>
				<div className="card-header text-center">Chat with userName</div>
				<div className="card-body">
					<div className="leftChatBox">
						<h4>Gaurav</h4>
						<p>Hello Shiv, how are you</p>
					</div>
					<div className="rightChatBox">
						<h4>You</h4>
						<p>I am fine gaurav, What about you.</p>
					</div>
					<div className="leftChatBox">
						<h4>Gaurav</h4>
						<p>
							You need t o work on a thing , I will give you a demo which needs to be completed this
							weekend, This is very urgent, please keep yourself vacant for this week.
						</p>
					</div>
					<div className="rightChatBox">
						<h4>You</h4>
						<p>
							Yes gaurav we will do this, <i>hehe rinkiya k papa</i>
						</p>
					</div>
				</div>
				<div>
					<input
						className="form-control"
						value={chatMessage}
						onChange={(event) => {
							setChatMessage(event.target.value);
						}}
					/>
				</div>
				<div className="btn btn-default card-footer text-center" onClick={onSubmitMessage}>
					Send
				</div>
			</div>
		</div>
	);
};
