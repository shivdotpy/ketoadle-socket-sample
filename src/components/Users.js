import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_API_URL } from '../constants/constants';

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
					{users.map((user) => {
						return (
							<div className="col-md-4">
								<div className="card mt-2">
									<div className="card-body">
										<h5 className="card-title">Card title</h5>
										<p className="card-text">
											Some quick example text to build on the card title and make up the bulk of
											the card's content.
										</p>
										<a className="btn btn-primary">Chat With Me</a>
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
