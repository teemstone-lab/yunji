// 웹 워커 스크립트 (worker.ts)

export type {};
// importScripts('./mockHosts.ts');

// 웹 워커에서 메시지 받기
onmessage = (event: MessageEvent) => {
	// 메인 스레드에서 메세지를 보내면 동작

	console.log('보내졌어용:', event.data);

	const mockHosts = (limit: number, isOn?: boolean) => {
		const numberChecker = (num: number) => {
			const checkNumSize = Math.round(num) === 1 ? true : false;
			return checkNumSize;
		};

		const hosts = [];
		for (let i = 0; i < limit; i++) {
			hosts.push({ name: i + 1, isOn: isOn ? isOn : numberChecker(Math.random()) });
		}
		return hosts;
	};

	// 작업 수행
	// const result = event.data + ' 👍세상에서 제일가는 포테이토칩👍';
	const result = mockHosts(100);

	// 메인 스크립트로 결과 보내기
	postMessage(result);
};
