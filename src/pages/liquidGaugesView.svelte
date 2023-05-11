<script lang="ts">
	import {
		HostDataType,
		customMockHosts,
		windows,
	} from '../components/liquidGauges/liquidGaugesViewStroe';
	import Window from '../components/liquidGauges/Window.svelte';
	import ViewOptions from '../components/liquidGauges/ViewOptions.svelte';

	let showWindowNum: number = 4;
	let dark: boolean = false;

	const updateShowHosts = (data: HostDataType[] = $customMockHosts) => {
		if (showWindowNum > $windows.length) {
			const hiddenHosts = data.reduce((acc: HostDataType[], cur) => {
				if (!$windows.some((w) => cur.id === w.id)) {
					acc.push(cur);
				}
				return acc;
			}, []);

			const addedNum = showWindowNum - $windows.length;
			$windows = [...$windows, ...hiddenHosts.slice(0, addedNum)];
		} else {
			$windows = $windows.slice(0, showWindowNum);
		}

		for (let i = 0; i < showWindowNum; i++) {
			const id = $windows[i].id;
			const item = data.find((d) => d.id === id);
			if (item) $windows[i] = item;
		}
	};

	// #region Worker
	const worker = new Worker(
		new URL('../components/liquidGauges/getHostsWorker.ts', import.meta.url),
	);

	worker.postMessage('');

	worker.onmessage = (event) => {
		const data = event.data as HostDataType[];

		$customMockHosts = data;
		updateShowHosts(data);
	};
	// #endregion Worker
</script>

<div class="h-screen w-full {dark ? 'bg-blue-900' : 'bg-white'} p-4">
	<ViewOptions
		bind:selected="{showWindowNum}"
		bind:dark="{dark}"
		updateShowHosts="{updateShowHosts}"
	/>

	<div class="mx-auto grid gap-5 p-4 lg:max-w-5xl lg:grid-cols-2 2xl:max-w-7xl">
		{#if $windows}
			{#each $windows.slice(0, showWindowNum) as host, index (index)}
				<Window bind:host="{host}" index="{index}" />
			{/each}
		{/if}
	</div>
</div>
