import axios from 'axios';

// Set up axios request interceptors
axios.interceptors.request.use(
	function (config) {
		// general and security headers configurations
		config.headers = {
			Accept: 'application/json',
			'X-XSS-Protection': '1; mode=block',
			'Content-Type': 'application/json',
			'Cross-Origin-Embedder-Policy': 'require-corp',
			'Content-Security-Policy':
				"script-src 'self' 'unsafe-inline' kit.fontawesome.com code.jquery.com cdn.jsdelivr.net stackpath.bootstrapcdn.com cdn.datatables.net",
			'X-Frame-Options': 'SAMEORIGIN',
			'X-Content-Type-Options': 'nosniff',
			'Strict-Transport-Security': 'max-age=31536000',
			'Feature-Policy': "accelerometer 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; usb 'none'",
			'Cache-Control': 'no-cache',
			'Cross-Origin-Opener-Policy': 'same-origin',
			Pragma: 'no-cache',
		};

		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

// Axios Response Interceptor
axios.interceptors.response.use(
	function (config) {
		return config;
	},
	function (error) {
		// send an offline error when a user makes network request with no internet connection
		if (updateOnlineStatus() === 'offline') {
			error = { message: 'You are currently offline. Kindly turn on your network or try again' };
			return Promise.reject(error);
		}

		return Promise.reject(error);
	}
);

function updateOnlineStatus() {
	return navigator.onLine ? 'online' : 'offline';
}

window.addEventListener('offline', updateOnlineStatus);
window.addEventListener('online', updateOnlineStatus);
