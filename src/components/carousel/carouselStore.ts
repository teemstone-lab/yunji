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
		cpu: number;
		mem: number;
		swap: number;
		disk: number;
	};
};
// data 부분도 타입으로 빼면 짱~!
// id: string; name: string; isOn: boolean; --> 공통으로 쓰이는 부분 하나로 합치기
// 제네릭 처리
// 캐러셀에 사용된 타입은 따로 분리할 것.

type TopHost = { id: string; name: string; isOn: boolean; data: number };
export type TopHosts = {
	cpu: TopHost[];
	mem: TopHost[];
	swap: TopHost[];
	disk: TopHost[];
};

export type MockGroupType = {
	id: string;
	name: string;
	order: number;
	isOn: boolean;
	hosts: MockGroupHostType[];
	countHosts: { onHosts: number; totalHosts: number };
	topHosts: TopHosts;
};

export type DataType = 'cpu' | 'mem' | 'swap' | 'disk';
