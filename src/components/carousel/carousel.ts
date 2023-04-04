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

	#clockwise: number;

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
		this.#clockwise = -1;
		this.#timerId = undefined;
		this.#rotateFunction = () => {};
	}

	setRotateFunction(f: () => void) {
		this.#rotateFunction = f;
	}

	toggleHorizontal(value: CellViewType) {
		const isHorizontal = value === Horizontal;

		this.viewMode = value;
		this.carouselDirection = isHorizontal ? RotateY : RotateX;

		// if ~ else 까지는 OK
		// 해당 방향은 지양
		// 컴파일러가 불필요한 일을 덜하도록
		// 리팩토링 --> 가독성 + 성능최적화 둘 다 고려.
	}

	rotateCarousel() {
		this.angle = this.theta * this.selectedIndex * this.#clockwise;
		this.translateZ = -this.cellCount * 6;
		// 숫자 등 --> 의미있는 단어로 정의
	}

	changeCarousel(index: number) {
		this.theta = 360 / this.cellCount;
		this.translateZ = this.cellCount * 6;
		this.angle = this.theta * index;
		// 가급적! 무조건! 예외처리 하기
	}

	private intervalAnimation(delay: number, f: () => void) {
		return () => {
			clearInterval(this.#timerId);
			this.#timerId = setInterval(() => {
				this.selectedIndex++;
				f();
			}, delay);
		};
	}

	carouselAnimation(delay: number, f: () => void) {
		const result = this.intervalAnimation(delay, f);

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
