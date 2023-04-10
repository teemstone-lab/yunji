// 웹 워커 스크립트 (groupWorker.ts)
import type { MockGroupHostType, MockGroupType, TopHosts } from '../../store';
export type {};

type CreateNewGroups = {
	min: number;
	max: number;
	groups: MockGroupType[];
};

let groupMinNum: number;
let groupMaxNum: number;
let groupCount: number;

const random = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 피드백(TODO) : 추후 시스템 코어의 개수를 확인하여, 그것의 절반만큼 워커를 생성할 수 있도록.
const worker1 = new Worker(new URL('./hostWorker.ts', import.meta.url));
const worker2 = new Worker(new URL('./hostWorker.ts', import.meta.url));
const worker3 = new Worker(new URL('./hostWorker.ts', import.meta.url));
const worker4 = new Worker(new URL('./hostWorker.ts', import.meta.url));

const workers = { worker1, worker2, worker3, worker4 };
const workersCount = Object.keys(workers).length;

const topDatas = (hosts: MockGroupHostType[]) => {
	const sortByProp = (prop: keyof MockGroupHostType['data']) =>
		hosts
			.filter((host) => host.isOn)
			.sort((a, b) => b.data[prop] - a.data[prop])
			.slice(0, 5)
			.map(({ id, name, data }) => ({ id, name, data: data[prop] }));

	return {
		cpu: sortByProp('cpu'),
		mem: sortByProp('mem'),
		swap: sortByProp('swap'),
		disk: sortByProp('disk'),
	} as TopHosts;
};

// const numberChecker = (num: number) => {
// 	const checkNumSize = Math.round(num) === 1 ? true : false;
// 	return checkNumSize;
// };

// 웹 워커에서 메시지 받기
onmessage = (event: MessageEvent<CreateNewGroups | MockGroupType[]>) => {
	const newGroup = event.data as CreateNewGroups;
	groupMinNum = newGroup.min;
	groupMaxNum = newGroup.max;
	groupCount = random(groupMinNum, groupMaxNum);

	// --------------------------------------------------------------------------

	//#region Sub Worker
	type GroupType = {
		id: string;
		groupItem: MockGroupType;
	};

	const workerNum = (index: number) => {
		switch (index) {
			case 1:
				return workers.worker1;
			case 2:
				return workers.worker2;
			case 3:
				return workers.worker3;
			case 4:
				return workers.worker4;
			default:
				return workers.worker1;
		}
	};

	for (let i = 0; i < groupCount; i++) {
		const targetIndex = (i % workersCount) + 1;
		const id = String(self.crypto.randomUUID());

		const groupItem = {
			id,
			name: `group${i + 1}`,
			order: i,
			// isOn: numberChecker(Math.random()),
			isOn: true,
			hosts: [],
			countHosts: {},
			topHosts: { cpu: [], mem: [], swap: [], disk: [] },
		};

		if (i < workersCount) {
			workerNum(i + 1).postMessage({ id, groupItem });
		} else {
			workerNum(targetIndex).postMessage({ id, groupItem });
		}
	}
	//#endregion Sub Worker

	const result = Array(groupCount);
	let isComplete: boolean = false;

	[1, 2, 3, 4].forEach((num) => {
		const worker = workerNum(num);

		worker.onmessage = (e) => {
			const data = e.data as GroupType;

			data.groupItem.topHosts = topDatas(data.groupItem.hosts);
			result[data.groupItem.order] = data.groupItem;

			const nonEmptyValues = result.filter((item) => item !== undefined && item !== null);
			isComplete = nonEmptyValues.length === groupCount;

			if (isComplete) {
				postMessage(result);
			}
		};
	});
};
