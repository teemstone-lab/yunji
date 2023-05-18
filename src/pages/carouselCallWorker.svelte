<style>
</style>

<script lang="ts">
	import type { MockGroupType } from 'src/components/carousel/carouselStore';
	import Carousel from '../components/carousel/Carousel.svelte';
	import { onDestroy } from 'svelte';

	let count: number = 0;
	let groups: MockGroupType[];

	const worker = new Worker(new URL('../components/carousel/groupWorker.ts', import.meta.url));

	worker.onmessage = (event) => {
		const newGroups = event.data as MockGroupType[];
		const newCount = Number(newGroups.length);

		count = newCount;
		groups = newGroups;
	};

	worker.postMessage({ min: 5, max: 20 });

	onDestroy(() => worker.terminate());
	// #endregion Web Worker - postmessage
</script>

<div class="mx-auto h-full w-full p-[100px]">
	{#if groups}
		<Carousel
			numberOfCells="{{ min: 5, max: count }}"
			bind:datas="{groups}"
			showTopData="{['cpu', 'mem', 'disk']}"
		/>
	{/if}
</div>
