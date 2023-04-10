<style>
</style>

<script lang="ts">
	import Carousel from '../components/carousel/Carousel.svelte';
	import type { MockGroupType } from 'src/store';

	let count: number = 0;
	let groups: MockGroupType[];

	let worker: Worker;

	const initWorker = () => {
		worker = new Worker(new URL('../components/carousel/groupWorker.ts', import.meta.url));
		worker.onmessage = (event) => {
			const newGroups = event.data as MockGroupType[];
			const newCount = Number(newGroups.length);

			count = newCount;
			groups = newGroups;
		};
	};

	const newCreateCount = () => {
		if (!worker) {
			initWorker();
		}
		worker.postMessage({ min: 5, max: 20, groups });
	};
	newCreateCount();
	// #endregion Web Worker - postmessage
</script>

<div class="mx-auto h-full w-full p-[100px]">
	{#if groups}
		<Carousel
			numberOfCells="{{ min: 5, max: count }}"
			bind:datas="{groups}"
			showTopData="{['cpu', 'mem']}"
		/>
	{/if}
</div>
