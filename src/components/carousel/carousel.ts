export enum CellViewType {
	Horizontal = 'horizontal',
	Vertical = 'vertical',
}

enum RotateType {
	RotateY = 'rotateY',
	RotateX = 'rotateX',
}

export const { Horizontal, Vertical } = CellViewType;
const { RotateY, RotateX } = RotateType;

export class Carousel {
	cellCount: number;

	viewMode: CellViewType;

	theta: number;

	translateZ: number;

	angle: number;

	selectedIndex: number;

	carouselDirection: RotateType;

	#timerId: string | number | NodeJS.Timeout | undefined;

	#rotateFunction: () => void;

	constructor(cellCount: number) {
		this.cellCount = cellCount;
		this.viewMode = Horizontal;
		this.theta = 0;
		this.translateZ = 0;
		this.angle = 0;
		this.selectedIndex = 0;
		this.carouselDirection = RotateY;
		this.#timerId = undefined;
		this.#rotateFunction = () => {};
	}

	setRotateFunction(f: () => void) {
		this.#rotateFunction = f;
	}

	toggleHorizontal(value: CellViewType) {
		const isHorizontal = value === Horizontal;
		const isVertical = value === Vertical;

		if (isHorizontal) {
			this.viewMode = Horizontal;
			this.carouselDirection = RotateY;
		}
		if (isVertical) {
			this.viewMode = Vertical;
			this.carouselDirection = RotateX;
		}
	}

	rotateCarousel() {
		this.angle = this.theta * this.selectedIndex * -1;
		this.translateZ = -this.cellCount * 6;
	}

	changeCarousel(index: number) {
		this.theta = 360 / this.cellCount;
		this.translateZ = this.cellCount * 6;
		this.angle = this.theta * index;
	}

	private debounce(delay: number, f: () => void) {
		return () => {
			clearTimeout(this.#timerId);
			this.#timerId = setInterval(() => {
				this.selectedIndex++;
				f();
			}, delay);
		};
	}

	carouselAnimation(delay: number, f: () => void) {
		const result = this.debounce(delay, f);

		return result;
	}

	stopCarouselAnimation() {
		clearInterval(this.#timerId);
	}

	resetAngle() {
		if (this.selectedIndex > this.cellCount) {
			this.angle = 0;
			this.selectedIndex = 0;
			this.stopCarouselAnimation();

			setTimeout(() => {
				this.selectedIndex++;
				this.#rotateFunction();
				this.carouselAnimation(3000, this.#rotateFunction)();
			}, 1);
		}
	}
}
