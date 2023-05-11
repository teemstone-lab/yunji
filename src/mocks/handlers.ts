import { rest } from 'msw';
// import type { BasicHostDataType } from '../commonTypes';
import uuid from '../lib/uuid';
import randomNumber from '../lib/randomNumber';

const hosts = Array(10);

for (let i = 0; i < 10; i++) {
	hosts[i] = {
		id: uuid(),
		name: `Host ${i + 1}`,
		isOn: true,
		data: {
			cpu: randomNumber(),
			mem: randomNumber(),
			swap: randomNumber(),
			disk: randomNumber(),
		},
		selectedData: [],
	};
}

export const handlers = [
	rest.get('/hosts', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(hosts));
	}),
	rest.get('/hosts/data', (req, res, ctx) => {
		hosts.forEach((host) => {
			host.data = {
				cpu: randomNumber(),
				mem: randomNumber(),
				swap: randomNumber(),
				disk: randomNumber(),
			};
		});

		return res(ctx.status(200), ctx.json(hosts));
	}),
	// rest.post('/hosts', (req, res, ctx) => {
	// 	// Persist user's authentication in the session
	// 	sessionStorage.setItem('is-authenticated', 'true');

	// 	return res(
	// 		// Respond with a 200 status code
	// 		ctx.status(200),
	// 	);
	// }),
];
