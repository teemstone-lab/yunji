import type { HostDataType } from './liquidGaugesViewStroe';

const dev = process.env.NODE_ENV === 'development' ? '' : 'https://teemstone-lab.github.io/yunji';
const url = { hosts: `${dev}/hosts`, hostsData: `${dev}/hosts/data` };

onmessage = function (event: MessageEvent) {
	let isUpdating: boolean = false;

	const callMsw = () => {
		fetch(isUpdating ? url.hostsData : url.hosts, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => postMessage(data as HostDataType[]))
			.catch((error) => console.error(error));
	};

	if (!isUpdating) {
		callMsw();

		setTimeout(() => {
			fetch(url.hostsData, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((response) => response.json())
				.then((data) => postMessage(data as HostDataType[]))
				.catch((error) => console.error(error));
		}, 100);

		isUpdating = true;
	}

	setInterval(() => {
		callMsw();
	}, 2000);
};
