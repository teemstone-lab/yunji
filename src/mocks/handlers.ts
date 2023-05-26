import { rest } from 'msw';
import randomNumber from '../lib/randomNumber';
import { mockHosts } from '../components/liquidGauges/liquidGaugesViewStroe';
import { get } from 'svelte/store';

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
