import { writable } from 'svelte/store';
export const dark = writable(false);

export type EventData = {
	result: number;
	elapsedTime: number;
};

export type MockHostType = {
	name: number;
	isOn: boolean;
};

export type NewHostType = {
	id?: Array<string>;
	groupName: string;
	limit: number;
	isAllTrue: boolean;
};

export type MockGroupHostType = {
	id: string;
	name: string;
	isOn: boolean;
	data: {
		top: number;
		cpu: number;
		mem: number;
		swap: number;
		disk: number;
	};
};

export type MockGroupType = {
	id: string;
	name: string;
	order: number;
	isOn: boolean;
	hosts: MockGroupHostType[];
};

export type ShowViewerListType = 'on' | 'off' | 'all';

// DateTime
export type DateTimeType = 'numeric' | '2-digit' | undefined;
export type DateTimeFormatOptions = {
	year: DateTimeType;
	month: DateTimeType;
	day: DateTimeType;
	hour: DateTimeType;
	minute: DateTimeType;
	second: DateTimeType;
	hour12: boolean;
	timeZone?: string | undefined;
	timeZoneName?: 'short' | 'long' | 'shortOffset' | 'longOffset' | undefined;
};
