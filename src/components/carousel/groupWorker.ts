// 웹 워커 스크립트 (groupWorker.ts)
import type { MockGroupHostType, MockGroupType } from '../../store';

export type {};
// importScripts('./mockHosts.ts');

type CreateNumberRange = {
	min: number;
	max: number;
};

const random = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const numberChecker = (num: number) => {
	const checkNumSize = Math.round(num) === 1 ? true : false;
	return checkNumSize;
};

// 웹 워커에서 메시지 받기
self.onmessage = async (event: MessageEvent<CreateNumberRange | MockGroupType[]>) => {
	const newGroup = event.data as CreateNumberRange;
	const minNum = newGroup.min;
	const maxNum = newGroup.max;
	const mockGroupList = event.data as MockGroupType[];
	const isNewGroupsCase: boolean = minNum && maxNum ? true : false;

	const count = random(minNum, maxNum);

	//#region 다른 워커랑 통신 테스트 시작~~~
	const worker = new Worker(new URL('./hostWorker1.ts', import.meta.url));

	const newHostsCreate = (groupName?: string) => {
		return new Promise((resolve) => {
			worker.onmessage = (test) => {
				resolve(test.data as MockGroupHostType[]);
			};
			worker.postMessage({
				groupName: groupName,
				// limit: [50, 100],
				limit: random(50, 100),
				isAllTrue: false,
			});
		});
	};

	//#endregion 다른 워커랑 통신 테스트 시작~~~

	const mockGroupsCreator = async (limit: number, isOn?: boolean) => {
		const groups: MockGroupType[] = [];
		for (let i = 0; i < limit; i++) {
			const data = await newHostsCreate(String(i + 1));

			groups.push({
				name: i + 1,
				isOn: isOn ? isOn : numberChecker(Math.random()),
				hosts: data as MockGroupHostType[],
			});
		}
		return groups;
	};

	const returnGroupList = async () => {
		for (const item of mockGroupList) {
			const data = await newHostsCreate(String(item.name));
			item.hosts = data as MockGroupHostType[];
		}
		return mockGroupList;
	};

	const result = isNewGroupsCase ? await mockGroupsCreator(count, true) : await returnGroupList();

	self.postMessage(result);
};
