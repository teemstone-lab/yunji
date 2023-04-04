// 웹 워커 스크립트 (hostWorker.ts)
import type { MockGroupHostType, NewHostType } from '../../store';

export type {};

const randomNumber = (num: number) => {
	const checkNumSize = Math.floor(num * 100);
	return checkNumSize;
};

const numberChecker = (num: number) => {
	const checkNumSize = Math.round(num) === 1 ? true : false;
	return checkNumSize;
};

// 웹 워커에서 메시지 받기
onmessage = (event: MessageEvent<NewHostType | MockGroupHostType[]>) => {
	const newHosts = event.data as NewHostType;
	const groupName = newHosts.groupName;
	const isNewHostsCase: boolean = groupName ? true : false;

	const mockHostsCreator = (limit: number, isOn?: boolean) => {
		const hosts = Array(limit) as MockGroupHostType[];
		for (let i = 0; i < limit; i++) {
			hosts[i] = {
				name: `Group${groupName}-${i + 1}`,
				isOn: isOn ? isOn : numberChecker(Math.random()),
				data: {
					top: randomNumber(Math.random()),
					cpu: randomNumber(Math.random()),
					mem: randomNumber(Math.random()),
					swap: randomNumber(Math.random()),
					disk: randomNumber(Math.random()),
				},
			};
		}
		return hosts;
	};

	const returnHostList = () => {
		const mockHostList = event.data as MockGroupHostType[];

		for (const item of mockHostList) {
			item.isOn = numberChecker(Math.random());
			item.data = {
				top: randomNumber(Math.random()),
				cpu: randomNumber(Math.random()),
				mem: randomNumber(Math.random()),
				swap: randomNumber(Math.random()),
				disk: randomNumber(Math.random()),
			};
		}
		return mockHostList;
	};

	const result = isNewHostsCase
		? mockHostsCreator(newHosts.limit, newHosts.isAllTrue)
		: returnHostList();
	//
	// 메인 워커로 결과 보내기
	postMessage(result);
};
