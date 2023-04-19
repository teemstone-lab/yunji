import { uuid } from '../../lib/uuid';
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
};

type DragDropData = { fruitIndex: number; fruitId: string; shopIndex: number | null };

const fruitsData = writable<Fruit[]>([
	{ id: uuid(), name: '사과', icon: '🍎', isHovering: false },
	{ id: uuid(), name: '딸기', icon: '🍓', isHovering: false },
	{ id: uuid(), name: '배', icon: '🍐', isHovering: false },
	{ id: uuid(), name: '귤', icon: '🍊', isHovering: false },
	{ id: uuid(), name: '복숭아', icon: '🍑', isHovering: false },
	{ id: uuid(), name: '아보카도', icon: '🥑', isHovering: false },
]);

export const additionalFruitsData = [
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

const shopsData = writable<Shop[]>(
	[
		{
			id: uuid(),
			name: '팀스톤 청과',
			fruits: [],
			isHovering: false,
		},
		{ id: uuid(), name: '온튠 청과', fruits: [], isHovering: false },
		{ id: uuid(), name: '민혁 사기꾼 청과', fruits: [], isHovering: false },
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

export const fruits = {
	...fruitsData,
	getIsHoveringItem: () => get(fruitsData).find(($fruitsData) => $fruitsData.isHovering),
	setItem: (addFruit: Fruit) => {
		fruitsData.update(($fruitsData) => {
			$fruitsData.push(addFruit);
			$fruitsData = $fruitsData;

			return $fruitsData;
		});
	},
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

export const shops = {
	...shopsData,
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
	setItem: (id: string, fruit: Fruit) => {
		shopsData.update(($shopsData) => {
			const thisShop = $shopsData.find((data) => data.id === id);
			thisShop?.fruits.push(fruit);
			return $shopsData;
		});
	},
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
