import uuid from '../../lib/uuid';
import { get, writable } from 'svelte/store';

export type Fruit = {
	id: string;
	name: string;
	icon: string;
	isHovering: boolean;
};

export type Shop = {
	id: string;
	name: string;
	fruits: Array<Fruit>;
	isHovering: boolean | 'duplicate';
	color: string;
};

type DragDropData = { fruitIndex: number; fruitId: string; shopIndex: number | null };

// #region All Add / Delete / Default Fruits Buttons
enum ListButtonType {
	Add = 'Add',
	Delete = 'Delete',
	Default = 'Default',
}

export const { Add, Delete, Default } = ListButtonType;
// #endregion All Add / Delete / Default Fruits Buttons

// #region Basic Datas
export const basicFruitsData = [
	{ id: uuid(), name: '사과', icon: '🍎', isHovering: false },
	{ id: uuid(), name: '딸기', icon: '🍓', isHovering: false },
	{ id: uuid(), name: '배', icon: '🍐', isHovering: false },
	{ id: uuid(), name: '귤', icon: '🍊', isHovering: false },
	{ id: uuid(), name: '복숭아', icon: '🍑', isHovering: false },
	{ id: uuid(), name: '아보카도', icon: '🥑', isHovering: false },
	{ id: uuid(), name: '키위', icon: '🥝', isHovering: false },
	{ id: uuid(), name: '코코넛', icon: '🥥', isHovering: false },
	{ id: uuid(), name: '포도', icon: '🍇', isHovering: false },
	{ id: uuid(), name: '메론', icon: '🍈', isHovering: false },
	{ id: uuid(), name: '수박', icon: '🍉', isHovering: false },
	{ id: uuid(), name: '레몬', icon: '🍋', isHovering: false },
	{ id: uuid(), name: '바나나', icon: '🍌', isHovering: false },
	{ id: uuid(), name: '파인애플', icon: '🍍', isHovering: false },
	{ id: uuid(), name: '망고', icon: '🥭', isHovering: false },
	{ id: uuid(), name: '풋사과', icon: '🍏', isHovering: false },
	{ id: uuid(), name: '체리', icon: '🍒', isHovering: false },
	{ id: uuid(), name: '블루베리', icon: '🫐', isHovering: false },
	{ id: uuid(), name: '토마토', icon: '🍅', isHovering: false },
];

const fruitsData = writable<Fruit[]>([...basicFruitsData.slice(0, 6)]);

const shopsData = writable<Shop[]>(
	[
		{
			id: uuid(),
			name: '팀스톤 청과',
			fruits: [],
			isHovering: false,
			color: '#FFCB43',
		},
		{ id: uuid(), name: '온튠 청과', fruits: [], isHovering: false, color: '#F7D6A2' },
		{
			id: uuid(),
			name: '민혁 사기꾼 청과',
			fruits: [],
			isHovering: false,
			color: '#97D6F1',
		},
	],
	() => {
		const initFruit = get(fruitsData);
		shopsData.update((shopData) =>
			shopData.map((shop, index) => {
				const slickIndex = { start: index * 2, end: index * 2 + 2 };

				shop.fruits.push(...initFruit.slice(slickIndex.start, slickIndex.end));
				return { ...shop, fruits: shop.fruits };
			}),
		);
	},
);
// #endregion Basic Datas

// #region frutis Custom store
export const fruits = {
	...fruitsData,
	getIsHoveringItem: () => get(fruitsData).find(($fruitsData) => $fruitsData.isHovering),
	/**
	 * 새 아이템 추가
	 * @param {Fruit} addFruit 새로 추가할 아이템
	 */
	setItem: (addFruit: Fruit) => {
		fruitsData.update(($fruitsData) => {
			$fruitsData.push(addFruit);
			$fruitsData = $fruitsData;

			return $fruitsData;
		});
	},
	/**
	 * 특정 아이템 삭제
	 * @param {number} fruitIndex 아이템의 index
	 * @param {number | null} shopIndex 가게의 index || null
	 */
	deleteItem: (fruitIndex: number, shopIndex: number | null) => {
		if (shopIndex !== null) {
			shopsData.update(($shopsData) => {
				$shopsData[shopIndex].fruits.splice(fruitIndex, 1);

				$shopsData = $shopsData;

				return $shopsData;
			});
		} else {
			fruitsData.update(($fruitsData) => {
				$fruitsData.splice(fruitIndex, 1);
				$fruitsData = $fruitsData;

				return $fruitsData;
			});
		}
	},
	/**
	 * basicFruitsData 아이템을 리스트에 모두 추가
	 */
	allAddItems: () => {
		fruitsData.set(basicFruitsData);
	},
	/**
	 * 리스트의 모든 아이템 삭제
	 */
	allDeleteItems: () => {
		fruitsData.set([]);
	},
	/**
	 * 리스트의 아이템을 초기값으로 설정
	 */
	setDefaultItems: () => {
		fruitsData.set([...basicFruitsData.slice(0, 6)]);
	},
	/**
	 * 아이템 드래그 시작
	 * @param {any} e DragEvent
	 * @param {number} fruitIndex 드래그 하는 아이템의 index
	 * @param {string} fruitId 드래그 하는 아이템의 고유 id
	 * @param {number | null} shopIndex 드래그를 시작한 가게의 index || null
	 */
	dragStart: (e: any, fruitIndex: number, fruitId: string, shopIndex: number | null) => {
		const event = e as DragEvent;

		const data: DragDropData = {
			fruitIndex: fruitIndex,
			fruitId: fruitId,
			shopIndex: shopIndex,
		};

		fruitsData.update(($fruitsData) => {
			const thisFruit = $fruitsData.find((fruit) => fruit.id === fruitId);
			if (thisFruit) thisFruit.isHovering = true;

			return $fruitsData;
		});

		if (event && event.dataTransfer) {
			event.dataTransfer.setData('text/plain', JSON.stringify(data));
		}
	},
};
// #endregion frutis Custom store

// #region shops Custom store
export const shops = {
	...shopsData,
	/**
	 * 아이템을 드래그한 상태의 가게의 isHovering 상태 변경
	 * @param {string | null} id 가게의 고유 id || null
	 */
	setHoveringShop: (id: string | null) => {
		shopsData.update(($shopsData) => {
			const thisShop = $shopsData.find((shopData) => shopData.id === id);

			if (thisShop) {
				const isDuplicate = thisShop.fruits.find(
					(fruit) => fruit.id === fruits.getIsHoveringItem()?.id,
				)
					? true
					: false;
				if (isDuplicate) {
					thisShop.isHovering = 'duplicate';
				} else {
					thisShop.isHovering = true;
				}
			} else {
				$shopsData.forEach((shop) => (shop.isHovering = false));
			}

			return $shopsData;
		});
	},
	/**
	 * 가게의 fruit 에 새 아이템 추가
	 * @param {string} id 가게의 고유 id
	 * @param {Fruit} fruit 추가된 아이템
	 */
	setItem: (id: string, fruit: Fruit) => {
		shopsData.update(($shopsData) => {
			const thisShop = $shopsData.find((data) => data.id === id);
			thisShop?.fruits.push(fruit);
			return $shopsData;
		});
	},
	/**
	 * 가게 영역에 아이템 Drop
	 * @param {any} e DragEvent
	 * @param {number} shopIndex 아이템이 drop 된 가게의 index
	 */
	drop: (e: any, shopIndex: number) => {
		const event = e as DragEvent;
		event.preventDefault();

		if (event && event.dataTransfer) {
			const json = event.dataTransfer.getData('text/plain');
			const data = JSON.parse(json) as DragDropData;

			shopsData.update(($shopsData) => {
				const isDuplicate = $shopsData[shopIndex].fruits.find(
					(fruit) => fruit.id === data.fruitId,
				)
					? true
					: false;

				if (!isDuplicate) {
					if (data.shopIndex !== null) {
						const [item] = $shopsData[data.shopIndex].fruits.splice(data.fruitIndex, 1);
						$shopsData[shopIndex].fruits.push(item);
					} else {
						const item = get(fruitsData)[data.fruitIndex];

						$shopsData[shopIndex].fruits.push(item);
					}
					$shopsData = $shopsData;
				}

				return $shopsData;
			});

			fruitsData.update(($fruitsData) => {
				$fruitsData.forEach((fruit) => (fruit.isHovering = false));

				return $fruitsData;
			});

			shops.setHoveringShop(null);
		}
	},
};
// #endregion shops Custom store
