import { writable } from 'svelte/store'

function createDataStore() {
	let intervalId = 0;
	const {set, update, subscribe } = writable({}, () => {
		return () => {
			clearInterval(intervalId)
		};
	});
	
	function initiate() {
		if (!intervalId) {
			intervalId = setInterval(async () => {
				const url = `http://localhost:4000/debug/vars`;
				const header_params = { 'Authorization': `Bearer A3FVQ423HWQ5AQC6MXBKWPUKH4` };
				const response = await fetch(url, { headers: header_params });

				set(await response.json());
			}, 5000);
		}
	}
	
	initiate();
	
	return {
		subscribe,
	};
}

export const data = createDataStore();