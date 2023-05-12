<script lang="ts">
	import LiquidGauge from './LiquidGauge.svelte';
	import WindowHeader from './WindowHeader.svelte';
	import type { HostDataType } from './liquidGaugesViewStroe';

	export let host: HostDataType;
	export let index: number;

	let viewOptions: Array<keyof HostDataType['data']> = ['cpu'];

	if (host.selectedData.length < 1) {
		host.selectedData = ['cpu'];
	}
</script>

<section class="w-full select-none overflow-hidden rounded border bg-white bg-opacity-80">
	<WindowHeader bind:host="{host}" index="{index}" bind:viewOptions="{viewOptions}" />

	<div class="flex items-center justify-center gap-x-4 p-4">
		{#each viewOptions as viewOption}
			<LiquidGauge dataName="{viewOption}" dataNum="{host.data[viewOption]}" size="{200}" />
		{/each}
	</div>
</section>
