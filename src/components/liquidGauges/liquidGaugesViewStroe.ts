// import randomNumber from '../../lib/randomNumber';
import type { BasicDatasType, BasicHostType } from '../../commonTypes';
import { get, writable } from 'svelte/store';

export type HostDataType = BasicHostType & {
	data: BasicDatasType;
	viewOptions: Array<keyof HostDataType['data']>;
};

const datas = {
	cpu: 0,
	mem: 0,
	swap: 0,
	disk: 0,
};

const cpu = ['cpu'] as (keyof BasicDatasType)[];
const mem = ['mem'] as (keyof BasicDatasType)[];
const cpuMem = ['cpu', 'mem'] as (keyof BasicDatasType)[];

export const viewOptions = [
	{ key: cpu, name: 'CPU' },
	{ key: mem, name: 'Memory' },
	{ key: cpuMem, name: 'CPU + Memory' },
];

export const mockHosts = writable<HostDataType[]>([
	{
		id: 'dcdd4986-b1ce-4299-98f3-7588f86c683a',
		name: 'Host 1',
		isOn: true,
		data: datas,
		viewOptions: cpu,
	},
	{
		id: 'aee15590-7ed6-482f-b3e2-4bb94b80fa26',
		name: 'Host 2',
		isOn: true,
		data: datas,
		viewOptions: cpu,
	},
	{
		id: '0b8c6030-8294-4fae-b0a0-640dd9ddc36f',
		name: 'Host 3',
		isOn: true,
		data: datas,
		viewOptions: cpu,
	},
	{
		id: 'ba7b0f47-12b7-43c6-90ae-6a5b205210a5',
		name: 'Host 4',
		isOn: true,
		data: datas,
		viewOptions: cpu,
	},
	{
		id: '8072c733-ac19-49ad-953c-c97d07ed1b0e',
		name: 'Host 5',
		isOn: true,
		data: datas,
		viewOptions: cpu,
	},
	{
		id: '9f09d13b-37aa-4081-afd0-94d7fb6c2076',
		name: 'Host 6',
		isOn: true,
		data: datas,
		viewOptions: cpu,
	},
	{
		id: 'b2438a01-80c7-4bb8-b5fe-11dd81d457da',
		name: 'Host 7',
		isOn: true,
		data: datas,
		viewOptions: cpu,
	},
	{
		id: '9b321d1e-d3d3-436e-9e2e-89f918db940d',
		name: 'Host 8',
		isOn: true,
		data: datas,
		viewOptions: cpu,
	},
	{
		id: 'd5d8d071-e3db-469c-bc36-5eea7bee2728',
		name: 'Host 9',
		isOn: true,
		data: datas,
		viewOptions: cpu,
	},
	{
		id: '34ab995f-5ba8-40b6-acc8-f41e200dca73',
		name: 'Host 10',
		isOn: true,
		data: datas,
		viewOptions: cpu,
	},
]);

export const views = writable<HostDataType[]>([]);

const getIsAutoLoad = localStorage.getItem('isAutoLoad');
const isAutoLoad = writable<boolean>(
	getIsAutoLoad ? (JSON.parse(getIsAutoLoad) as boolean) : false,
	() => {},
);

export const autoLoad = {
	...isAutoLoad,
	getIsAutoLoadState: () => {
		if (getIsAutoLoad) isAutoLoad.set(JSON.parse(getIsAutoLoad) as boolean);
	},
	loadSavedData: () => {
		const data = localStorage.getItem('hosts');

		if (data) {
			views.set(JSON.parse(data) as HostDataType[]);

			get(views).forEach((view) => {
				const item = get(mockHosts).find((mockHost) => mockHost.id === view.id);

				if (item) item.viewOptions = view.viewOptions;
			});

			return get(views).length;
		}
	},
};
