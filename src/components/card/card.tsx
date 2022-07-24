import React from 'react';
import styles from './card.module.scss';

interface Props {
	url?: string;
	name?: string;
	type?: number;
}

const Card: React.FC<Props> = ({ name, url, type }): React.ReactElement => {
	return (
		<article className={styles.card}>
			<img src={url} alt={name} className={styles.img} loading='lazy' />
			<h4 className={styles.name}>Name: {name}</h4>
			<p className={styles.type}>Type: {type}</p>
		</article>
	);
};

export default Card;
