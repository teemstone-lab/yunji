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
onmessage = async (event: MessageEvent<CreateNumberRange | MockGroupType[]>) => {
	const newGroup = event.data as CreateNumberRange;
	const minNum = newGroup.min;
	const maxNum = newGroup.max;
	const mockGroupList = event.data as MockGroupType[];
	const isNewGroupsCase: boolean = minNum && maxNum ? true : false;

	const count = random(minNum, maxNum);

	//#region Sub Worker
	const worker1 = new Worker(new URL('./hostworker.ts', import.meta.url));
	const worker2 = new Worker(new URL('./hostWorker.ts', import.meta.url));
	const worker3 = new Worker(new URL('./hostWorker.ts', import.meta.url));
	const worker4 = new Worker(new URL('./hostWorker.ts', import.meta.url));

	const postMessageProps = (groupName: string) => {
		return {
			groupName: groupName,
			limit: random(50, 100),
			isAllTrue: false,
		};
	};

	const newHostsCreate1 = (groupName: string, hosts?: MockGroupHostType[]) => {
		return new Promise((resolve) => {
			worker1.onmessage = (host) => {
				resolve(host.data as MockGroupHostType[]);
			};
			worker1.postMessage(hosts ? hosts : postMessageProps(groupName));
		});
	};

	const newHostsCreate2 = (groupName: string, hosts?: MockGroupHostType[]) => {
		return new Promise((resolve) => {
			worker2.onmessage = (host) => {
				resolve(host.data as MockGroupHostType[]);
			};
			worker2.postMessage(hosts ? hosts : postMessageProps(groupName));
		});
	};

	const newHostsCreate3 = (groupName: string, hosts?: MockGroupHostType[]) => {
		return new Promise((resolve) => {
			worker3.onmessage = (host) => {
				resolve(host.data as MockGroupHostType[]);
			};
			worker3.postMessage(hosts ? hosts : postMessageProps(groupName));
		});
	};

	const newHostsCreate4 = (groupName: string, hosts?: MockGroupHostType[]) => {
		return new Promise((resolve) => {
			worker4.onmessage = (host) => {
				resolve(host.data as MockGroupHostType[]);
			};
			worker4.postMessage(hosts ? hosts : postMessageProps(groupName));
		});
	};

	const distributeWorker = (cellNumber: number, items?: MockGroupHostType[]) => {
		switch (cellNumber) {
			case 1:
			case 5:
			case 9:
				return newHostsCreate1(String(cellNumber), items);
			case 2:
			case 6:
			case 10:
				return newHostsCreate2(String(cellNumber), items);
			case 3:
			case 7:
			case 11:
				return newHostsCreate3(String(cellNumber), items);
			case 4:
			case 8:
			case 12:
				return newHostsCreate4(String(cellNumber), items);

			default:
				return newHostsCreate1(String(cellNumber), items);
		}
	};
	//#endregion Sub Worker

	const mockGroupsCreator = async (limit: number, isOn?: boolean) => {
		const groups = Array(limit) as MockGroupType[];
		for (let i = 0; i < limit; i++) {
			const data = await distributeWorker(i + 1);

			groups[i] = {
				id: self.crypto.randomUUID(),
				name: `group${i + 1}`,
				isOn: isOn ? isOn : numberChecker(Math.random()),
				hosts: data as MockGroupHostType[],
			};
		}
		return groups;
	};

	const returnGroupList = async () => {
		for (const item of mockGroupList) {
			const itemIndex = mockGroupList.indexOf(item);
			const data = await distributeWorker(itemIndex, item.hosts);

			item.hosts = data as MockGroupHostType[];
		}
		return mockGroupList;
	};

	const result = isNewGroupsCase ? await mockGroupsCreator(count, true) : await returnGroupList();

	postMessage(result);
};
