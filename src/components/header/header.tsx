import React from 'react';
import styles from './header.module.scss';

const Header: React.FC = (): React.ReactElement => {
	return (
		<header className={styles.header}>
			<a href='/' className={styles.logoWrapper}>
				<img src='https://placekitten.com/200/315' className={styles.logo} alt='logo' loading='lazy' />
			</a>
			<nav className={styles.nav}>
				<a href='/' className={styles.link}>
					Trending Users
				</a>
			</nav>
		</header>
	);
};

export default Header;
