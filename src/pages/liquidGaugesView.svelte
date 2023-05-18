<script lang="ts">
	import {
		HostDataType,
		mockHosts,
		views,
	} from '../components/liquidGauges/liquidGaugesViewStroe';
	import ViewsOption from '../components/liquidGauges/ViewsOption.svelte';
	import View from '../components/liquidGauges/View.svelte';
	import { onDestroy } from 'svelte';

	let showWindowNum: number = 4;

	const updateShowHosts = (data: HostDataType[] = $mockHosts) => {
		if (showWindowNum > $views.length) {
			const hiddenHosts = data.reduce((acc: HostDataType[], cur) => {
				if (!$views.some((w) => cur.id === w.id)) {
					acc.push(cur);
				}
				return acc;
			}, []);

			const addedNum = showWindowNum - $views.length;
			$views = [...$views, ...hiddenHosts.slice(0, addedNum)];
		} else {
			$views = $views.slice(0, showWindowNum);
		}

		for (let i = 0; i < showWindowNum; i++) {
			const id = $views[i].id;
			const item = data.find((d) => d.id === id);

			if (item) $views[i] = item;
		}
	};

	// #region Worker
	const worker = new Worker(
		new URL('../components/liquidGauges/getHostsWorker.ts', import.meta.url),
	);

	worker.postMessage('');

	worker.onmessage = (event) => {
		const data = event.data as HostDataType[];

		$mockHosts = data;
		updateShowHosts(data);
	};
	// #endregion Worker

	onDestroy(() => worker.terminate());
</script>

<div class="h-screen w-full p-4">
	<ViewsOption bind:selected="{showWindowNum}" updateShowHosts="{updateShowHosts}" />

	<div class="mx-auto grid gap-5 p-4 lg:max-w-5xl lg:grid-cols-2 2xl:max-w-7xl">
		{#if $views}
			{#each $views as host, index (host.id)}
				<View bind:host="{host}" index="{index}" />
			{/each}
		{/if}
	</div>
</div>
