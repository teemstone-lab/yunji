<script lang="ts">
	import type { EventData } from 'src/store';
	import Layout from '../components/common/Layout.svelte';

	let worker1: Worker;
	let worker2: Worker;

	let isBtn1Click: boolean = false;
	let isBtn2Click: boolean = false;
	let isBtn3Click: boolean = false;

	function startCalculatingFibonacci1() {
		const n = 45;

		if (worker1) {
			worker1.terminate();
		}

		worker1 = new Worker(new URL('fibonacci-worker.ts', import.meta.url));

		worker1.onmessage = function (event) {
			const { result, elapsedTime } = event.data as EventData;

			const divResult1 = document.getElementById('result1') as HTMLDivElement;
			divResult1.innerText = `피보나치 결과: ${result}, 경과 시간: ${elapsedTime}ms`;
			isBtn1Click = false;
		};

		worker1.postMessage({ n });
	}

	function startCalculatingFibonacci2() {
		const n = 45;

		if (worker2) {
			worker2.terminate();
		}

		worker2 = new Worker(new URL('fibonacci-worker.ts', import.meta.url));

		worker2.onmessage = function (event) {
			console.log(event);
			const { result, elapsedTime } = event.data as EventData;

			const divResult2 = document.getElementById('result2') as HTMLDivElement;
			divResult2.innerText = `피보나치 결과: ${result}, 경과 시간: ${elapsedTime}ms`;
			isBtn2Click = false;
		};

		worker2.postMessage({ n });
	}

	function fibonacci(n: number): number {
		if (n <= 1) return n;

		return fibonacci(n - 1) + fibonacci(n - 2);
	}

	const onClickHandler = () => {
		const el = document.querySelector('#result3') as HTMLDivElement;
		if (el) el.innerText = `피보나치 결과: ${String(fibonacci(45))}`;
		isBtn3Click = false;
	};

	// #region Style
	const buttonStyle =
		'rounded-md border px-2 py-1 font-semibold transition-all hover:bg-gray-100';
	const animateStyle = {
		div: 'absolute inset-0  h-full w-full overflow-hidden rounded bg-white text-center font-semibold',
		span: 'flex h-full w-full animate-pulse items-center justify-center bg-slate-200',
	};
	const textAreaStyle = 'rounded-md border px-2 py-1 transition-all hover:bg-gray-100';
	// #endregion Style
</script>

<Layout title="피보나치 수열 (웹 워커)">
	<section class="flex w-full flex-col justify-center gap-4">
		<ul class="flex justify-center gap-2">
			<li class="relative"
				><button
					class="{buttonStyle}"
					on:click="{() => {
						isBtn1Click = true;
						startCalculatingFibonacci1();
					}}"
					>피보나치 계산 시작 1 (worker)
				</button>
				{#if isBtn1Click}
					<div class="{animateStyle.div}"
						><span class="{animateStyle.span}">🐜 계산중</span></div
					>
				{/if}
			</li>
			<li class="relative"
				><button
					class="{buttonStyle}"
					on:click="{() => {
						isBtn2Click = true;
						startCalculatingFibonacci2();
					}}">피보나치 계산 시작 2 (worker)</button
				>{#if isBtn2Click}
					<div class="{animateStyle.div}"
						><span class="{animateStyle.span}">🐜🐜 계산중</span></div
					>
				{/if}</li
			>
			<li class="relative">
				<button
					class="{buttonStyle}"
					on:click="{() => {
						isBtn3Click = true;
						onClickHandler();
					}}">피보나치 계산 시작 3 (no worker)</button
				>{#if isBtn3Click}
					<div class="{animateStyle.div}"
						><span class="{animateStyle.span}">🐜🐜🐜 계산중</span></div
					>
				{/if}</li
			>
		</ul>

		<div id="result1"></div>
		<div id="result2"></div>
		<div id="result3"></div>
		<textarea
			name=""
			id=""
			cols="60"
			rows="10"
			placeholder="* 피보나치 계산 버튼을 누르고 텍스트를 입력해보세요 😎"
			class="{textAreaStyle}"></textarea>
	</section>
</Layout>
