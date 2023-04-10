// 웹 워커 스크립트 (hostWorker.ts)
import type { MockGroupHostType, MockGroupType } from '../../store';

export type {};

const randomNumber = (num: number) => {
	const checkNumSize = Math.floor(num * 100);
	return checkNumSize;
};

const random = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const numberChecker = (num: number) => {
	const checkNumSize = Math.round(num) === 1 ? true : false;
	return checkNumSize;
};

const countIsOnHosts = (hosts: MockGroupHostType[]) => {
	const totalHosts = hosts;
	const isOnHosts = totalHosts.filter((host) => host.isOn === true);

	const result = { onHosts: isOnHosts.length, totalHosts: totalHosts.length };
	return result;
};

type GroupType = {
	id: string;
	groupItem: MockGroupType;
};

onmessage = (e: MessageEvent<GroupType>) => {
	const data = e.data;
	const groupItem = data.groupItem;

	// NEW
	const mockHostsCreator = (limit: number, isOn: boolean) => {
		groupItem.hosts = Array(limit) as MockGroupHostType[];

		for (let i = 0; i < limit; i++) {
			groupItem.hosts[i] = {
				id: self.crypto.randomUUID(),
				name: `${groupItem.name}-${i + 1}`,
				isOn: isOn ? isOn : numberChecker(Math.random()),
				data: {
					cpu: randomNumber(Math.random()),
					mem: randomNumber(Math.random()),
					swap: randomNumber(Math.random()),
					disk: randomNumber(Math.random()),
				},
			};
		}

		groupItem.countHosts = countIsOnHosts(groupItem.hosts);

		if (groupItem.hosts.length === limit) {
		}

		return groupItem.hosts;
	};

	// EXIST
	const returnHostList = (existData: GroupType) => {
		for (const item of existData.groupItem.hosts) {
			item.isOn = numberChecker(Math.random());
			item.data = {
				cpu: randomNumber(Math.random()),
				mem: randomNumber(Math.random()),
				swap: randomNumber(Math.random()),
				disk: randomNumber(Math.random()),
			};
		}
		groupItem.countHosts = countIsOnHosts(groupItem.hosts);
		return existData;
	};

	setInterval(() => {
		if (groupItem.hosts.length > 0) {
			returnHostList(data);
		} else {
			mockHostsCreator(random(50, 100), false);
		}
		postMessage(data);
	}, 1000);

	// mockHostsCreator(random(50, 100), false);
	// postMessage(data);
};
