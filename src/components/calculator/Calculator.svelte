<script lang="ts">
	import { onMount } from 'svelte';
	import { Calculator } from './calculator';

	// const calculator = [
	// 	'AC',
	// 	'+/-',
	// 	'%',
	// 	'÷',
	// 	7,
	// 	8,
	// 	9,
	// 	'×',
	// 	4,
	// 	5,
	// 	6,
	// 	'-',
	// 	1,
	// 	2,
	// 	3,
	// 	'+',
	// 	0,
	// 	'.',
	// 	'=',
	// ];

	// let text = '';

	// function inputText(calc: string | number) {
	// 	let result = '';
	// 	text = text + String(calc);
	// 	console.log(calc === '+');

	// 	if (calc === '=') {
	// 		if (text.includes('-')) {
	// 			const testestset = text.slice(0, -1).split('-');
	// 			result = String(test1.minus(Number(testestset[0]), Number(testestset[1])));
	// 		}
	// 		if (text.includes('×')) {
	// 			const testestset = text.slice(0, -1).split('×');
	// 			result = String(test1.multi(Number(testestset[0]), Number(testestset[1])));
	// 		}
	// 		text = text + result;
	// 		result = '';
	// 	} else {
	// 	}
	// }

	const calc = new Calculator();
	let text: string = '';
	enum ButtonType {
		Number,
		Operator,
		Extra,
	}

	const liStyle = (buttonType: ButtonType) => {
		const defaultStyle = 'h-full w-full rounded-full';

		switch (buttonType) {
			case ButtonType.Number:
				return `${defaultStyle} bg-gray-500 bg-opacity-70 hover:bg-gray-300`;
			case ButtonType.Operator:
				return `${defaultStyle} bg-orange-400 hover:bg-orange-300`;
			case ButtonType.Extra:
				return `${defaultStyle} bg-gray-300 hover:bg-gray-100 text-black`;
		}
	};
	const buttonStyle = 'h-full w-full';

	onMount(() => {
		// #region querySelector

		// #region Number
		const numEl0 = document.querySelector('.number0') as HTMLLIElement;

		if (numEl0)
			numEl0.addEventListener('click', () => {
				calc.inputNumber(0);
				text = calc.getViewerText();
			});

		const numEl1 = document.querySelector('.number1') as HTMLLIElement;
		if (numEl1)
			numEl1.addEventListener('click', () => {
				calc.inputNumber(1);
				text = calc.getViewerText();
			});

		const numEl2 = document.querySelector('.number2') as HTMLLIElement;
		if (numEl2)
			numEl2.addEventListener('click', () => {
				calc.inputNumber(2);
				text = calc.getViewerText();
			});

		const numEl3 = document.querySelector('.number3') as HTMLLIElement;
		if (numEl3)
			numEl3.addEventListener('click', () => {
				calc.inputNumber(3);
				text = calc.getViewerText();
			});

		const numEl4 = document.querySelector('.number4') as HTMLLIElement;
		if (numEl4)
			numEl4.addEventListener('click', () => {
				calc.inputNumber(4);
				text = calc.getViewerText();
			});

		const numEl5 = document.querySelector('.number5') as HTMLLIElement;
		if (numEl5)
			numEl5.addEventListener('click', () => {
				calc.inputNumber(5);
				text = calc.getViewerText();
			});

		const numEl6 = document.querySelector('.number6') as HTMLLIElement;
		if (numEl6)
			numEl6.addEventListener('click', () => {
				calc.inputNumber(6);
				text = calc.getViewerText();
			});

		const numEl7 = document.querySelector('.number7') as HTMLLIElement;
		if (numEl7)
			numEl7.addEventListener('click', () => {
				calc.inputNumber(7);
				text = calc.getViewerText();
			});

		const numEl8 = document.querySelector('.number8') as HTMLLIElement;
		if (numEl8)
			numEl8.addEventListener('click', () => {
				calc.inputNumber(8);
				text = calc.getViewerText();
			});

		const numEl9 = document.querySelector('.number9') as HTMLLIElement;
		if (numEl9)
			numEl9.addEventListener('click', () => {
				calc.inputNumber(9);
				text = calc.getViewerText();
			});
		// #endregion Number

		// #region operator
		const operAdd = document.querySelector('.operAdd') as HTMLLIElement;
		if (operAdd)
			operAdd.addEventListener('click', () => {
				calc.selectOperator('add');
				text = calc.getViewerText();
			});

		const operMinus = document.querySelector('.operMinus') as HTMLLIElement;
		if (operMinus)
			operMinus.addEventListener('click', () => {
				calc.selectOperator('minus');
				text = calc.getViewerText();
			});

		const operMulti = document.querySelector('.operMulti') as HTMLLIElement;
		if (operMulti)
			operMulti.addEventListener('click', () => {
				calc.selectOperator('multi');
				text = calc.getViewerText();
			});

		const operDivide = document.querySelector('.operDivide') as HTMLLIElement;
		if (operDivide)
			operDivide.addEventListener('click', () => {
				calc.selectOperator('divide');
				text = calc.getViewerText();
			});

		const result = document.querySelector('.result') as HTMLLIElement;
		if (result)
			result.addEventListener('click', () => {
				calc.result();
				text = calc.getViewerText();
			});
		// #endregion operator
		// #endregion querySelector
	});
</script>

<div class="mx-auto w-[320px] space-y-4 rounded-xl bg-black p-4 text-2xl text-white">
	<input
		type="text"
		name=""
		id=""
		disabled
		class="h-20 w-full rounded-md bg-transparent p-2 text-right text-5xl"
		value="{text}"
	/>
	<ul
		class="grid auto-rows-[minmax(66px,auto)] grid-cols-4 items-center justify-center gap-2 font-semibold"
	>
		<!-- Line 1 -->
		<li class="{liStyle(ButtonType.Extra)}"
			><button
				class="{buttonStyle}"
				on:click="{() => {
					calc.clear();
					text = calc.getViewerText();
				}}">{text ? 'C' : 'AC'}</button
			></li
		>
		<li class="{liStyle(ButtonType.Extra)}"
			><button class="{buttonStyle}" on:click="{() => calc.clear()}">+/-</button></li
		>
		<li class="{liStyle(ButtonType.Extra)}"
			><button class="{buttonStyle}" on:click="{() => calc.percent()}">%</button></li
		>
		<li class="{liStyle(ButtonType.Operator)}"
			><button class="operDivide {buttonStyle}">÷</button></li
		>

		<!-- Line 2 -->
		<li class="{liStyle(ButtonType.Number)}"
			><button class="number7 {buttonStyle}">7</button></li
		>
		<li class="{liStyle(ButtonType.Number)}"
			><button class="number8 {buttonStyle}">8</button></li
		>
		<li class="{liStyle(ButtonType.Number)}"
			><button class="number9 {buttonStyle}">9</button></li
		>
		<li class="{liStyle(ButtonType.Operator)}"
			><button class="operMulti {buttonStyle}">×</button></li
		>

		<!-- Line 3 -->
		<li class="{liStyle(ButtonType.Number)}"
			><button class="number4 {buttonStyle}">4</button></li
		>
		<li class="{liStyle(ButtonType.Number)}"
			><button class="number5 {buttonStyle}">5</button></li
		>
		<li class="{liStyle(ButtonType.Number)}"
			><button class="number6 {buttonStyle}">6</button></li
		>
		<li class="{liStyle(ButtonType.Operator)}"
			><button class="operMinus {buttonStyle}">-</button></li
		>

		<!-- Line 4 -->
		<li class="{liStyle(ButtonType.Number)}"
			><button class="number1 {buttonStyle}">1</button></li
		>
		<li class="{liStyle(ButtonType.Number)}"
			><button class="number2 {buttonStyle}">2</button></li
		>
		<li class="{liStyle(ButtonType.Number)}"
			><button class="number3 {buttonStyle}">3</button></li
		>
		<li class="{liStyle(ButtonType.Operator)}"
			><button class="operAdd {buttonStyle}">+</button></li
		>

		<!-- Line 5 -->
		<li class="{liStyle(ButtonType.Number)} col-span-2"
			><button class="number0 {buttonStyle}">0</button></li
		>
		<li class="{liStyle(ButtonType.Number)}"
			><button class="{buttonStyle}" on:click="{() => calc.inputNumber(0)}">.</button></li
		>
		<li class="{liStyle(ButtonType.Operator)}"
			><button class="result {buttonStyle}">=</button></li
		>

		<!-- {#each calculator as calc}
			<li class="h-full w-full rounded-full {liStyle(calc)} {calc === 0 ? 'col-span-2' : ''}"
				><button
					class="h-full w-full"
					on:click="{() => (calc === 'AC' ? deleteInput() : inputText(calc))}"
					>{calc}</button
				></li
			>
		{/each} -->
	</ul>
</div>
