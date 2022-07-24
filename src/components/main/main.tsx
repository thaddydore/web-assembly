import React, { useState, useId } from 'react';
import styles from './main.module.scss';
import { api } from '../../utils/api';

import Card from '../card/card';
import Search from '../../custom/search/search';

interface User {
	login?: string;
	avatar_url?: string;
	type?: number;
}

interface Response {
	data: {
		items: User[];
		incomplete_results: boolean;
		total_count: number;
	};
}

const Home: React.FC = (): React.ReactElement => {
	const [searchType, setSearchType] = useState('user');
	const [searchTerm, setSearchTerm] = useState('');
	const [error, setError] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [users, setUsers] = React.useState<User[]>([]);

	const getUsers = async (url: string): Promise<void> => {
		setError('');
		setLoading(true);

		try {
			const { data } = (await api.get(url)) as Response;
			setUsers(data?.items);
			setLoading(false);
			setSearchTerm(''); // reset the search box
		} catch (error: any) {
			setError(error.response.data.message || error.message);
			setLoading(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => setSearchTerm(e.target.value);
	const handleFilterSearchType = (e: React.ChangeEvent<HTMLInputElement>): void => setSearchType(e.target.value);

	const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		let url = '';

		if (searchType === 'org') url = `search/users?q=${searchTerm}+type:org`;
		if (searchType === 'user') url = `search/users?q=${searchTerm}`;

		getUsers(url);
	};

	let id = useId(); // generate random stable id

	const usersList = users.map(user => (
		<Card key={id + user?.login} name={user?.login} url={user?.avatar_url} type={user?.type} />
	));

	return (
		<main className={styles.main}>
			<h1 className={styles.heading}>Discover Github Users</h1>
			<form className={styles.form} onSubmit={handleSearch}>
				<Search handleChange={handleChange} value={searchTerm} />
				<div className={styles.labelGroup}>
					<label className={styles.label}>
						user:
						<input type='radio' name='searchType' onChange={handleFilterSearchType} value='user' defaultChecked />
					</label>
					<label className={styles.label}>
						Organization:
						<input type='radio' name='searchType' onChange={handleFilterSearchType} value='org' />
					</label>
				</div>
				<button type='submit' className={styles.btn}>
					Submit
				</button>
			</form>
			{loading && <p className={styles.loading}>loading...</p>}
			{error && <p className={styles.error}>{error}</p>}
			{Object.values(users).length < 1 && !error && !loading && <p className={styles.empty}>No result found</p>}
			<section className={styles.container}>{usersList}</section>
		</main>
	);
};

export default Home;
