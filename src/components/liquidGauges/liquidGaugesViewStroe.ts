import type { BasicDatasType, BasicHostType } from '../../commonTypes';
import { get, writable } from 'svelte/store';

export type HostDataType = BasicHostType & {
	data: BasicDatasType;
	selectedData: Array<keyof HostDataType['data']>;
};

export const mockHosts = writable<HostDataType[]>();

export const customMockHosts = {
	...mockHosts,
	getshowHosts: (limit: number = 4) => get(mockHosts).slice(0, limit),
};

export const windows = writable<HostDataType[]>([]);
