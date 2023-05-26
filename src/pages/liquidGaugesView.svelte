<script lang="ts">
	import {
		HostDataType,
		autoLoad,
		displayedHosts,
		mockHosts,
	} from '../components/liquidGauges/liquidGaugesViewStroe';
	import ViewsOption from '../components/liquidGauges/ViewsOption.svelte';
	import View from '../components/liquidGauges/View.svelte';
	import { onDestroy } from 'svelte';

	let showWindowNum: number = 4;

	if ($autoLoad) {
		showWindowNum = autoLoad.loadSavedData() || 4;
	}

	const updateShowHosts = (data: HostDataType[] = $mockHosts) => {
		if (showWindowNum > $displayedHosts.length) {
			const hiddenHosts = data.reduce((acc: HostDataType[], cur) => {
				if (!$displayedHosts.some((w) => cur.id === w.id)) {
					acc.push(cur);
				}
				return acc;
			}, []);

			const addedNum = showWindowNum - $displayedHosts.length;
			$displayedHosts = [...$displayedHosts, ...hiddenHosts.slice(0, addedNum)];
		} else {
			$displayedHosts = $displayedHosts.slice(0, showWindowNum);
		}

		for (let i = 0; i < showWindowNum; i++) {
			const id = $displayedHosts[i].id;
			const item = data.find((d) => d.id === id);

			if (item) $displayedHosts[i] = { ...item, viewOptions: $displayedHosts[i].viewOptions };
		}
	};

	// #region Worker
	const worker = new Worker(
		new URL('../components/liquidGauges/getHostsWorker.ts', import.meta.url),
	);

	worker.postMessage('start');

	worker.onmessage = (event) => {
		const data = event.data as HostDataType[];

		$mockHosts = data;
		updateShowHosts(data);
	};
	// #endregion Worker

	onDestroy(() => worker.terminate());
</script>

<div class="h-auto w-full p-4 lg:h-[calc(100vh-44px)]">
	<div class="mx-auto flex h-full flex-col lg:max-w-5xl 2xl:max-w-7xl">
		<ViewsOption bind:selected="{showWindowNum}" updateShowHosts="{updateShowHosts}" />

		<!-- <div class="grid grow gap-5 lg:grid-cols-2"> -->
		<div class="grid gap-5 pb-4 lg:grid-cols-2">
			{#if $displayedHosts}
				{#each $displayedHosts as host, index (index)}
					<View bind:host="{host}" index="{index}" />
				{/each}
			{/if}
		</div>
	</div>
</div>
