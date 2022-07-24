import React from 'react';
import styles from './search.module.scss';

interface Props {
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
}

const Search: React.FC<Props> = ({ handleChange, value }): React.ReactElement => {
	return (
		<div className={styles.search}>
			<label className={styles.label}>
				<input
					type='search'
					placeholder='Search users by name'
					className={styles.input}
					onChange={handleChange}
					value={value}
				/>
			</label>
		</div>
	);
};

export default Search;
