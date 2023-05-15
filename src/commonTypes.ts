export type BasicHostType = {
	id: string;
	name: string;
	isOn: boolean;
};

export type BasicDatasType = {
	cpu: number;
	mem: number;
	swap: number;
	disk: number;
};

export type BasicHostDataType = BasicHostType & {
	data: BasicDatasType;
};
