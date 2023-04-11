import type { MockGroupHostType, MockGroupType, TopHosts } from './carouselStore';

// 웹 워커 스크립트 (groupWorker.ts)
export type {};

type CreateNewGroups = {
	min: number;
	max: number;
};

let groupMinNum: number;
let groupMaxNum: number;
let groupCount: number;

/**
 * @param {number} min 최소값
 * @param {number} max 최대값
 * @return {number} min 과 max 사이의 랜덤한 정수
 */
const random = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 시스템 코어의 개수를 확인하여, 그것의 절반만큼 워커를 생성.
const numWorkers = Math.floor(navigator.hardwareConcurrency / 2) || 1;
// 1코어의 경우는 어떻게 되는가? --> 최소값을 1
// 혹은 올림 함수를 사용할 것.
const workers = Array(numWorkers).fill(undefined);

for (let i = 0; i < numWorkers; i++) {
	const worker = new Worker(new URL('./hostWorker.ts', import.meta.url));
	workers[i] = worker;
}

const workersCount = workers.length;

// --------------------------------------------------------------------------

/**
 * cpu, mem, swap, disk 각각의 데이터 중,
 * 가장 높은 TOP5 데이터들을 구하는 함수
 * @param {MockGroupHostType[]} hosts 호스트들
 */
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

	//#region Sub Worker
	type GroupType = {
		id: string;
		groupItem: MockGroupType;
	};

	for (let i = 0; i < groupCount; i++) {
		const targetIndex = i % workersCount;
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
			workers[i].postMessage({ id, groupItem });
		} else {
			workers[targetIndex].postMessage({ id, groupItem });
			// 해당 부분도 통신 비용. (최소 비용을 염두에 둘 것)
			// 이 부분도 그룹 아이템을 다 만들어서 한번만 postMessage 하는 방향으로.(워커 하나하나 지정 안해도 되지 않을까?)
		}
	}
	//#endregion Sub Worker

	const result = Array(groupCount);
	let isComplete: boolean = false;

	workers.forEach((worker) => {
		worker.onmessage = (e: MessageEvent<GroupType>) => {
			const data = e.data;

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
