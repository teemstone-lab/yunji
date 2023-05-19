<script lang="ts">
	import LiquidGauge from './LiquidGauge.svelte';
	import ViewHeader from './ViewHeader/index.svelte';
	import type { HostDataType } from './liquidGaugesViewStroe';

	export let host: HostDataType;
	export let index: number;
</script>

<section
	class="flex w-full select-none flex-col overflow-hidden rounded border bg-white bg-opacity-80"
>
	<ViewHeader bind:host="{host}" index="{index}" />

	<div class="flex h-full grow items-center justify-center gap-x-4 p-4">
		{#each host.viewOptions as viewOption}
			<LiquidGauge dataName="{viewOption}" dataNum="{host.data[viewOption]}" />
		{/each}
	</div>
</section>
