export enum CellViewType {
	Horizontal = 'horizontal',
	Vertical = 'vertical',
}

enum RotateType {
	RotateY = 'rotateY',
	RotateX = 'rotateX',
}

export class Carousel {
	cellCount: number;

	viewMode: CellViewType;

	theta: number;

	translateZ: number;

	angle: number;

	selectedIndex: number;

	carouselDirection: RotateType;

	timerId: string | number | NodeJS.Timeout | undefined;

	constructor(cellCount: number) {
		this.cellCount = cellCount;
		this.viewMode = CellViewType.Horizontal;
		this.theta = 0;
		this.translateZ = 0;
		this.angle = 0;
		this.selectedIndex = 0;
		this.carouselDirection = RotateType.RotateY;
		this.timerId = undefined;
	}

	isChangedCellCount(cellCount: number) {
		this.cellCount = cellCount;
	}

	toggleHorizontal(value: CellViewType) {
		if (value === CellViewType.Horizontal) {
			this.viewMode = CellViewType.Horizontal;
			this.carouselDirection = RotateType.RotateY;
		}
		if (value === CellViewType.Vertical) {
			this.viewMode = CellViewType.Vertical;
			this.carouselDirection = RotateType.RotateX;
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
			clearTimeout(this.timerId);
			this.timerId = setInterval(() => {
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
		clearInterval(this.timerId);
	}

	resetAngle(f: () => void) {
		if (this.selectedIndex > this.cellCount) {
			this.angle = 0;
			this.selectedIndex = 0;
			this.stopCarouselAnimation();

			setTimeout(() => {
				this.selectedIndex++;
				f();
				this.carouselAnimation(3000, f)();
			}, 1);
		}
	}
}
