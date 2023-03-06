export class Calculator {
	#currentValue: number;

	#viewerText: string;

	#selectedOperator: ((x: number, y: number) => number) | null;

	constructor() {
		this.#currentValue = 0;
		this.#viewerText = '';
		this.#selectedOperator = null;
	}

	inputNumber(number: number) {
		this.#viewerText = this.#viewerText + String(number);
	}

	getViewerText() {
		return this.#viewerText;
	}

	selectOperator(operator: string) {
		if (operator === 'add') {
			this.#selectedOperator = (x: number, y: number) => this.add(x, y);
			this.#viewerText = this.#viewerText + '+';
		}
		if (operator === 'minus') {
			this.#selectedOperator = (x: number, y: number) => this.minus(x, y);
			this.#viewerText = this.#viewerText + '-';
		}
		if (operator === 'multi') {
			this.#selectedOperator = (x: number, y: number) => this.multi(x, y);
			this.#viewerText = this.#viewerText + '×';
		}
		if (operator === 'divide') {
			this.#selectedOperator = (x: number, y: number) => this.divide(x, y);
			this.#viewerText = this.#viewerText + '÷';
		}
	}

	add(x: number, y: number) {
		return x + y;
	}

	minus(x: number, y: number) {
		return x - y;
	}

	multi(x: number, y: number) {
		return x * y;
	}

	divide(x: number, y: number) {
		return x / y;
	}

	percent() {
		const result = Number(this.#viewerText) / 100;
		this.clear();

		return result;
	}

	result() {
		// if (this.#selectedOperator) console.log(this.#viewerText);
		// console.log(this.#selectedOperator(Number(this.#viewerText), 2));
	}

	clear() {
		this.#viewerText = '';
		this.#currentValue = 0;
	}
}
