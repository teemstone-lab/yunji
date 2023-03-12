export class Calculator {
	#currentValue: number;

	#viewerText: string;

	#operator: string;

	#selectedOperator: ((x: number, y: number) => number) | null;

	#isNegative: boolean;

	#hasDot: boolean;

	constructor() {
		this.#currentValue = 0;
		this.#viewerText = '';
		this.#operator = '';
		this.#selectedOperator = null;
		this.#isNegative = false;
		this.#hasDot = false;
	}

	inputNumber(number: number) {
		const viewerLeftText = this.#viewerText;
		const viewerRightText = this.#viewerText.split(this.#operator)[1];
		const enteredText = this.#selectedOperator ? viewerRightText : viewerLeftText;

		const isStartZero = () => {
			const index = this.#isNegative ? 1 : 0;
			return enteredText[index] === '0';
		};

		const isLimitedLength = enteredText.length > 8;

		if (isLimitedLength) {
			if (isLimitedLength) alert('Number Limit!');
		} else {
			// -0 혹은 0 으로 시작 시, 예외 케이스
			if (!this.#hasDot && isStartZero()) {
				this.#viewerText = this.#viewerText.slice(0, -1);
			}

			this.#viewerText = this.#viewerText + String(number);
		}
	}

	getViewerText() {
		return this.#viewerText;
	}

	selectOperator(operator: string) {
		if (this.#viewerText && !this.#operator) {
			switch (operator) {
				case 'add':
					this.#selectedOperator = (x: number, y: number) => this.add(x, y);
					this.#operator = '+';
					break;
				case 'minus':
					this.#selectedOperator = (x: number, y: number) => this.minus(x, y);
					this.#operator = '-';
					break;
				case 'multi':
					this.#selectedOperator = (x: number, y: number) => this.multi(x, y);
					this.#operator = '×';
					break;
				case 'divide':
					this.#selectedOperator = (x: number, y: number) => this.divide(x, y);
					this.#operator = '÷';
					break;
			}
			this.#viewerText = this.#viewerText + this.#operator;

			this.#currentValue = 0;
			this.#isNegative = false;
			this.#hasDot = false;
		}
	}

	private add(x: number, y: number) {
		return x + y;
	}

	private minus(x: number, y: number) {
		return x - y;
	}

	private multi(x: number, y: number) {
		return x * y;
	}

	private divide(x: number, y: number) {
		return x / y;
	}

	percent() {
		const result = Number(this.#viewerText) / 100;
		this.#viewerText = String(result);
	}

	toggleNegative() {
		this.#isNegative = !this.#isNegative;
		//좌변 + 오퍼레이터
		const viewerLeftTextOperator = this.#viewerText.split(this.#operator)[0] + this.#operator;
		const viewerLeftNum = Number(this.#viewerText);
		const viewerRightNum = Number(this.#viewerText.split(this.#operator)[1]);

		let result = this.#selectedOperator ? viewerRightNum : viewerLeftNum;
		const isNegativeAndZero = this.#isNegative && result === 0;

		if (this.#isNegative) {
			result = Number(result) * -1;
		} else {
			result = Math.abs(result);
		}

		const viewerRightValueText = isNegativeAndZero ? '-0' : String(result);

		if (this.#selectedOperator) {
			this.#viewerText = viewerLeftTextOperator + viewerRightValueText;
		} else {
			this.#viewerText = viewerRightValueText;
		}
	}

	addDot() {
		const checkHasDot = !this.#hasDot && Number.isInteger(this.#currentValue);
		const leftText = this.#viewerText;
		const rightText = this.#viewerText.split(this.#operator)[1];

		const enteredText = this.#selectedOperator ? rightText : leftText;

		const isStartZero = enteredText.length > 0;

		if (checkHasDot) {
			const dot = isStartZero ? '.' : '0.';
			this.#viewerText = this.#viewerText + dot;
			this.#hasDot = true;
		}
	}

	result() {
		if (this.#selectedOperator) {
			const numbers = this.#viewerText.split(this.#operator);
			const leftNum = Number(numbers[0]);
			const rightNum = Number(numbers[1]);

			this.#currentValue = this.#selectedOperator(leftNum, rightNum);

			if (!Number.isInteger(this.#currentValue)) {
				this.#currentValue = Number(this.#currentValue.toFixed(8));
			}

			this.#viewerText = String(this.#currentValue);

			this.semiClear();
		}
	}

	private semiClear() {
		this.#operator = '';
		this.#selectedOperator = null;
		this.#isNegative = false;
		this.#hasDot = false;
	}

	clear() {
		this.#viewerText = '';
		this.#currentValue = 0;

		this.semiClear();
	}
}
