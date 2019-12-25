import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_API_URL } from '../constants/constants';
import { getUserType } from '../utils/common-methods';

export const Users = (props) => {
	const [ users, setUsers ] = useState([]);

	useEffect(() => {
		axios
			.get(BASE_API_URL + '/user/getAllUsers')
			.then((response) => {
				setUsers(response.data.data);
			})
			.catch((error) => {
				console.log(error.response);
			});
	}, []);

	return (
		<div>
			<div className="container mt-5">
				<div className="row">
					{users.map((user, index) => {
						return (
							<div className="col-md-4" key={index}>
								<div className="card mt-2">
									<div className="card-body">
										<h5 className="card-title">{user.name}</h5>
										<p className="card-text">E-mail : {user.email}</p>
										<p>I am a : {user.userType === 'recruiter' ? 'Recruiter' : 'Job Seeker'}</p>
										{user.userType === getUserType() ? (
											<button disabled className="btn btn-warning" style={{cursor: 'not-allowed'}}>
												Chat not available
											</button>
										) : (
											<button
												className="btn btn-info"
												onClick={() => {
													props.history.push(`/chat/${user._id}`);
												}}
											>
												Chat with me
											</button>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
