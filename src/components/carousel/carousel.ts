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

	containerWidth: number;

	containerHeight: number;

	cellWidth: number;

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

		this.containerWidth = 0;
		this.containerHeight = 0;
		this.cellWidth = 0;
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

	private calcTranslateZ(isNegative?: boolean) {
		const result =
			Math.round(this.cellWidth / 2 / Math.tan(Math.PI / this.cellCount)) + this.theta;

		return isNegative ? result * -1 : result;

		// Math.PI = 원주율(π)
		// Math.tan() 함수 = 주어진 각도의 탄젠트 값을 반환

		// Math.PI / this.cellCount = 삼각형의 한 각도의 크기
		// Math.tan(Math.PI / this.cellCount) = 이 각도의 탄젠트 값을 계산.

		// this.cellWidth / 2 = 삼각형의 밑변의 절반 길이.
		// this.cellWidth / 2 / Math.tan(Math.PI / this.cellCount) = 삼각형의 높이(h)를 계산.

		// Math.round() 함수 = 인자로 전달된 값을 반올림.
		// Math.round(this.cellWidth / 2 / Math.tan(Math.PI / this.cellCount)) = 삼각형의 높이(h)를 반올림한 값.
	}

	rotateCarousel() {
		this.angle = this.theta * this.selectedIndex * this.#clockwise;
		this.translateZ = this.calcTranslateZ(true);
	}

	changeCarousel(index: number) {
		if (index >= 0) {
			this.theta = 360 / this.cellCount;
			this.translateZ = this.calcTranslateZ();
			this.angle = this.theta * index;
		}
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
			}, 100);
		}
	}

	calcContainerSize(containerWidth: number) {
		if (this.viewMode === Horizontal) {
			this.containerWidth = containerWidth;
			this.containerHeight = this.containerWidth / 2;
		} else {
			this.containerWidth = containerWidth;
			this.containerHeight = this.containerWidth * 2;
		}
	}
}
