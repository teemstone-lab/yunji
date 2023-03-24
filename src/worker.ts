// 웹 워커 스크립트 (worker.ts)
import type { MockHostType } from './store';

export type {};
// importScripts('./mockHosts.ts');

type NewHostType = {
	limit: number;
	isAllTrue: boolean;
};
// 웹 워커에서 메시지 받기
onmessage = (event: MessageEvent<NewHostType | MockHostType[]>) => {
	const newHosts = event.data as NewHostType;
	const isNewHostsCase: boolean = newHosts.limit && newHosts.isAllTrue ? true : false;
	// 메인 스레드에서 메세지를 보내면 동작
	console.log('보내졌어용:', event.data);

	const numberChecker = (num: number) => {
		const checkNumSize = Math.round(num) === 1 ? true : false;
		return checkNumSize;
	};

	const mockHostsCreator = (limit: number, isOn?: boolean) => {
		const hosts = [];
		for (let i = 0; i < limit; i++) {
			hosts.push({ name: i + 1, isOn: isOn ? isOn : numberChecker(Math.random()) });
		}
		return hosts;
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
	const result = isNewHostsCase
		? mockHostsCreator(newHosts.limit, newHosts.isAllTrue)
		: returnHostList();

	// 메인 스크립트로 결과 보내기
	postMessage(result);
};
