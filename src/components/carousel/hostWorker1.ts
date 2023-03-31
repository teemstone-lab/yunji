// 웹 워커 스크립트 (hostWorker1.ts)
import type { MockGroupHostType, NewHostType } from '../../store';

export type {};

// 웹 워커에서 메시지 받기
onmessage = (event: MessageEvent<NewHostType>) => {
	const newHosts = event.data;
	const groupName = newHosts.groupName;

	const randomNumber = (num: number) => {
		const checkNumSize = Math.floor(num * 100);
		return checkNumSize;
	};

	const numberChecker = (num: number) => {
		const checkNumSize = Math.round(num) === 1 ? true : false;
		return checkNumSize;
	};

	const mockHostsCreator = (limit: number, isOn?: boolean) => {
		const hosts: MockGroupHostType[] = [];
		for (let i = 0; i < limit; i++) {
			hosts.push({
				name: `Group${groupName}-${i + 1}`,
				isOn: isOn ? isOn : numberChecker(Math.random()),
				data: {
					top: randomNumber(Math.random()),
					cpu: randomNumber(Math.random()),
					mem: randomNumber(Math.random()),
					swap: randomNumber(Math.random()),
					disk: randomNumber(Math.random()),
				},
			});
		}
		return hosts;
	};

	const result = mockHostsCreator(newHosts.limit, newHosts.isAllTrue);
	//
	// 메인 스크립트로 결과 보내기
	postMessage(result);
};
