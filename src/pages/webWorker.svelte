<script lang="ts">
	import type { EventData } from 'src/store';
	import Layout from '../components/test/Layout.svelte';

	let worker1: Worker;
	let worker2: Worker;

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
	};

	const buttonStyle =
		'rounded-md border px-2 py-1 font-semibold transition-all hover:bg-gray-100';
</script>

<Layout title="피보나치 수열 (웹 워커)">
	<button class="{buttonStyle}" on:click="{() => startCalculatingFibonacci1()}"
		>피보나치 계산 시작 1 (worker)</button
	>
	<button class="{buttonStyle}" on:click="{() => startCalculatingFibonacci2()}"
		>피보나치 계산 시작 2 (worker)</button
	>
	<button class="{buttonStyle}" on:click="{() => onClickHandler()}"
		>피보나치 계산 시작 3 (no worker)</button
	>

	<div id="result1"></div>
	<div id="result2"></div>
	<div id="result3"></div>
</Layout>
