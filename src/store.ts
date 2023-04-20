import { writable } from 'svelte/store';
export const dark = writable(false);

export const NavItems = [
	'fruitShop',
	'todoList',
	'carouselCallWorker',
	'onTuneViewer',
	'webWorker',
	'calculator',
];

enum ButtonType {
	Save = 'Save',
	Edit = 'Edit',
	Delete = 'Delete',
	Cancel = 'Cancel',
}
export const { Save, Edit, Delete, Cancel } = ButtonType;

export type EventData = {
	result: number;
	elapsedTime: number;
};

export type MockHostType = {
	name: number;
	isOn: boolean;
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
