import { writable } from 'svelte/store';
export const dark = writable(false);

export type EventData = {
	result: number;
	elapsedTime: number;
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
