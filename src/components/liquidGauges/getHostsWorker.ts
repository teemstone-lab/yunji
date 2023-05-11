import type { HostDataType } from './liquidGaugesViewStroe';

onmessage = function (event: MessageEvent) {
	let isUpdating: boolean = false;

	const callMsw = () => {
		fetch(isUpdating ? '/hosts/data' : '/hosts')
			.then((response) => response.json())
			.then((data) => postMessage(data as HostDataType[]))
			.catch((error) => console.error(error));
		if (!isUpdating) isUpdating = true;
	};

	callMsw();

	setInterval(() => {
		callMsw();
	}, 2000);
};
