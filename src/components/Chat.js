import React, { useEffect, useState } from 'react';
import './Chat.css';
import { parseJwt, getAccessToken, getUserType, getUserName } from '../utils/common-methods';
import axios from 'axios';
import { BASE_API_URL } from '../constants/constants';

export const Chat = (props) => {
	const [ chatMessage, setChatMessage ] = useState('');
	const [ chatHistory, setChatHistory ] = useState([]);
	const [ yourId, setYourId ] = useState(parseJwt(JSON.parse(localStorage.getItem('user')).token)._id);

	// check if logged in user is recruiter of jobSeeker
	const userType = getUserType();

	const chatIdRequestBody = {};

	if (userType === 'recruiter') {
		chatIdRequestBody.recruiterId = parseJwt(JSON.parse(localStorage.getItem('user')).token)._id;
		chatIdRequestBody.jobSeekerId = props.match.params.id;
	} else {
		chatIdRequestBody.jobSeekerId = parseJwt(JSON.parse(localStorage.getItem('user')).token)._id;
		chatIdRequestBody.recruiterId = props.match.params.id;
	}

	useEffect(() => {
		axios
			.post(`${BASE_API_URL}/api/chat/getChatId`, chatIdRequestBody, {
				headers: {
					token: getAccessToken()
				}
			})
			.then((response) => {
				getChatHistory(response.data.data);
				subscribeToMessage(response.data.data);
			})
			.catch((error) => {
				console.log(error.response);
			});
	}, []);

	const subscribeToMessage = () => {
		global.socket.on('chatMessage', (data) => {
			const tempHistory = [ ...chatHistory ];
			tempHistory.push(data);
			setChatHistory(tempHistory);
		});
	};

	const onSubmitMessage = () => {
		if (!chatMessage) {
			return;
		}

		global.socket.emit('message', {
			chatId: '5dd143c39ee7e00017a94596-5dd143f89ee7e00017a94599',
			name: getUserName(),
			message: chatMessage,
			userId: parseJwt(JSON.parse(localStorage.getItem('user')).token)._id
		});

		const tempHistory = [ ...chatHistory ];
		tempHistory.push({
			userId: parseJwt(JSON.parse(localStorage.getItem('user')).token)._id,
			message: chatMessage,
			time: new Date()
		});
		setChatHistory(tempHistory);
	};

	const getChatHistory = (chatId) => {
		axios
			.post(
				`${BASE_API_URL}/api/chat/getChatHistory`,
				{
					chatId
				},
				{
					headers: {
						token: getAccessToken()
					}
				}
			)
			.then((response) => {
				setChatHistory(response.data.data);
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
					{chatHistory.length === 0 && <p>No chat available</p>}
					{chatHistory.map((history) => {
						if (history.userId === yourId) {
							return (
								<div className="rightChatBox alert alert-primary">
									<h4>You</h4>
									<p>{history.message}</p>
								</div>
							);
						}
						return (
							<div className="leftChatBox alert alert-info">
								<h4>Gaurav</h4>
								<p>{history.message}</p>
							</div>
						);
					})}
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
				<div
					className="btn btn-default card-footer text-center"
					onClick={() => {
						onSubmitMessage();
						setChatMessage('');
					}}
				>
					Send
				</div>
			</div>
		</div>
	);
};
