import { rest } from 'msw';
// import type { BasicHostDataType } from '../commonTypes';
// import uuid from '../lib/uuid';
import randomNumber from '../lib/randomNumber';
import { mockHosts } from '../components/liquidGauges/liquidGaugesViewStroe';
import { get } from 'svelte/store';

// for (let i = 0; i < 10; i++) {
// 	hosts[i] = {
// 		id: uuid(),
// 		name: `Host ${i + 1}`,
// 		isOn: true,
// 		data: {
// 			cpu: randomNumber(),
// 			mem: randomNumber(),
// 			swap: randomNumber(),
// 			disk: randomNumber(),
// 		},
// 		viewOptions: ['cpu'],
// 	};
// }

export const handlers = [
	rest.get('/hosts', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(get(mockHosts)));
	}),
	rest.get('/hosts/data', (req, res, ctx) => {
		get(mockHosts).forEach(($mockHosts) => {
			$mockHosts.data = {
				cpu: randomNumber(),
				mem: randomNumber(),
				swap: randomNumber(),
				disk: randomNumber(),
			};
		});

		return res(ctx.status(200), ctx.json(get(mockHosts)));
	}),
];
