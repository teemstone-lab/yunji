import { worker } from '../../mocks/worker';

onmessage = function (event: MessageEvent) {
	console.log(event.data);

	// 여기에서 MSW 에 요청을 보내야...

	if (process.env.NODE_ENV === 'development') {
		worker.start().catch((error) => console.error(error));

		fetch('/hosts')
			.then((response) => response.json())
			.then((data) => postMessage(data))
			.catch((error) => console.error(error));
	}
};
