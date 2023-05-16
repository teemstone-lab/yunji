import type { HostDataType } from './liquidGaugesViewStroe';

onmessage = function (event: MessageEvent) {
	let isUpdating: boolean = false;

	const callMsw = () => {
		fetch(
			isUpdating
				? 'https://teemstone-lab.github.io/yunji/hosts/data'
				: 'https://teemstone-lab.github.io/yunji/hosts',
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
			.then((response) => response.json())
			.then((data) => postMessage(data as HostDataType[]))
			.catch((error) => console.error(error));
	};

	if (!isUpdating) {
		callMsw();

		setTimeout(() => {
			fetch('https://teemstone-lab.github.io/yunji/hosts/data', {
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
