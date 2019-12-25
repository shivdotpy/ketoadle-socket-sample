import React, { useState } from 'react';
import axios from 'axios';
import { BASE_API_URL } from '../constants/constants';

import './Login.css';
import { suscribeToSocket } from '../socket/socket.io';

export const Login = (props) => {
	const [ email, setEmail ] = useState('shiv@gmail.com');
	const [ password, setPassword ] = useState('Hello@123');
	const [ userType, setUserType ] = useState('recruiter');

	const onSubmit = () => {
		axios
			.post(BASE_API_URL + '/user/signin', {
				email,
				password,
				userType
			})
			.then((repsonse) => {
				localStorage.setItem('user', JSON.stringify(repsonse.data.data));
				suscribeToSocket(repsonse.data.data.token)
				props.history.push('/users');
			})
			.catch((error) => {
				console.log(error.repsonse);
			});
	};

	return (
		<div>
			<div className="login-form">
				<div className="text-center">
					<h3 className="mb-4">Ketoadle Login</h3>
				</div>
				<div className="form-group">
					<input
						className="form-control"
						placeholder="email"
						onChange={(event) => setEmail(event.target.value)}
						value={email}
					/>
				</div>
				<div className="form-group">
					<input
						className="form-control"
						placeholder="password"
						onChange={(event) => setPassword(event.target.value)}
						value={password}
					/>
				</div>
				<div className="form-group">
					<input
						className="form-control"
						placeholder="user type"
						onChange={(event) => setUserType(event.target.value)}
						value={userType}
					/>
				</div>
				<div className="text-center">
					<button className="btn btn-info" onClick={onSubmit}>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};
