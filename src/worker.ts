// 웹 워커 스크립트 (worker.ts)
import type { MockHostType } from './store';

export type {};
// importScripts('./mockHosts.ts');

// 웹 워커에서 메시지 받기
onmessage = (event: MessageEvent) => {
	// 메인 스레드에서 메세지를 보내면 동작
	console.log('보내졌어용:', event.data);

	const numberChecker = (num: number) => {
		const checkNumSize = Math.round(num) === 1 ? true : false;
		return checkNumSize;
	};

	const returnHostList = () => {
		const mockHostList = event.data as MockHostType[];
		const stateChangedHostList = mockHostList.map((item) => ({
			name: item.name,
			isOn: numberChecker(Math.random()),
		}));

		return stateChangedHostList;
	};

	// 작업 수행
	const result = returnHostList();

	// 메인 스크립트로 결과 보내기
	postMessage(result);
};
